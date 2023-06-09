import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Prenda } from 'src/app/model/prenda';
import { PrendaService } from 'src/app/service/prenda.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-usuario-editdiseno',
  templateUrl: './usuario-editdiseno.component.html',
  styleUrls: ['./usuario-editdiseno.component.css']
})
export class UsuarioEditdisenoComponent implements OnInit, OnDestroy {
  mensaje: any;
  selectedFile: File;
  previewImage: string | ArrayBuffer | null;
  form: FormGroup;
  id: number = 0;
  edicion: boolean = false;
  prenda: Prenda;
  router: any;

  constructor(
    private http: HttpClient,
    private prendaService: PrendaService
  ) {}

  ngOnInit(): void {
    this.id = parseInt(localStorage.getItem('idPrenda') || '0', 10);
    this.edicion = this.id !== 0;
    this.initForm();
    this.loadUserImage();

  }

  ngOnDestroy(): void {
    // Eliminar el ID del localStorage al salir del módulo
    localStorage.removeItem('idPrenda');
  }

  initForm() {
    this.form = new FormGroup({
      Titulo: new FormControl('', [Validators.required]),
      Tipo: new FormControl('', [Validators.required]),
      Descripcion: new FormControl('', [Validators.required]),
    });

    if (this.edicion) {
      this.prendaService.obtenerPrendaPorId(this.id).subscribe((data: Prenda) => {
        this.prenda = data;
        this.form.patchValue({
          Titulo: this.prenda.titulo,
          Tipo: this.prenda.tipo,
          Descripcion: this.prenda.descripcion,
        });
      });
    }
  }

  aceptar() : void {
    const Titulo = this.form.value['Titulo'];
    const Tipo = this.form.value['Tipo'];
    const Descripcion = this.form.value['Descripcion'];
  
    // Verificar si algún campo está vacío
    if (!Titulo || !Tipo || !Descripcion) {
      this.mensaje = 'Por favor, complete todos los campos del formulario.';
      return;
    }
  
    // Crear el objeto Prenda con los datos actualizados
    const prendaActualizada: Prenda = {
      id: this.prenda.id,
      idCreador: this.prenda.idCreador,
      imagen: this.prenda.imagen,
      titulo: Titulo,
      descripcion: Descripcion,
      tipo: Tipo,
    };
  
    if (this.edicion) {
      // If in edit mode, update the existing prenda
      this.prendaService.editarPrenda(this.id, prendaActualizada).subscribe(
        (response) => {
          this.mensaje = 'Prenda actualizada correctamente';
          timer(2000).subscribe(() => {
            this.router.navigate(['/MisDisenos']).then(() => {
              window.location.reload();
            });
          });
        },
        (error) => {
          this.mensaje = 'Error al actualizar la prenda';
        }
      );
    }
  }
  

  loadUserImage(): void {
    if (this.id !== 0) {
      this.prendaService.obtenerPrendaPorId(this.id).subscribe((data: Prenda) => {
        this.prenda = data;
        if (this.prenda.imagen) {
          const imageUrl = `${this.prenda.imagen}`;
          this.http.get(imageUrl, { responseType: 'blob' }).subscribe((imageBlob: Blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              this.previewImage = reader.result;
            };
            reader.readAsDataURL(imageBlob);
          });
        }
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadFile() {
     {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
    
        // Realizar una solicitud PUT o PATCH al servidor para actualizar el contenido de la imagen
        this.http.put<any>(`URL_DEL_ENDPOINT_DE_ACTUALIZACION_CONTENIDO/${this.id}`, formData).subscribe(
          (response) => {
            console.log('Contenido de la imagen actualizado exitosamente');
            // La URL de la imagen en el usuario ya apuntará a la nueva imagen actualizada
            this.prenda.imagen = response.filePath;
          },
          (error) => {
            console.error('Error al actualizar el contenido de la imagen:', error);
            // Maneja el error de actualización del contenido de la imagen si es necesario
          }
        );
      }
    }
  }

  deleteImage() {
    this.previewImage = null;
    // También puedes enviar una solicitud al servidor para eliminar la imagen actual
    // Si el servidor proporciona un endpoint para eliminar imágenes
  }
}
