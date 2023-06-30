import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrendaService  } from 'src/app/service/prenda.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Prenda } from 'src/app/model/prenda';
import { timer } from 'rxjs';



@Component({
  selector: 'app-usuario-nuevodiseno',
  templateUrl: './usuario-nuevodiseno.component.html',
  styleUrls: ['./usuario-nuevodiseno.component.css']
})
export class UsuarioNuevodisenoComponent implements OnInit {
  mensaje: string = '';
  selectedFile: File;
  previewImage: string | ArrayBuffer | null;
  form: FormGroup = new FormGroup({});
  router: any;

  constructor(private http: HttpClient, private prendaService: PrendaService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      Titulo: new FormControl(''),
      Tipo: new FormControl(''),
      Descripcion: new FormControl('') 
    });
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
  
    // Verificar si ya existe una prenda con el mismo título
    this.prendaService.listarPrendasPorTitulo(Titulo).subscribe(
      (prendas: Prenda[]) => {
        if (prendas.length > 0) {
          this.mensaje = 'Ya existe una prenda con el mismo título.';
          return;
        }
  
        // Obtener el ID del creador desde el Local Storage (asumiendo que está almacenado con la clave "userId")
        const idCreador = parseInt(localStorage.getItem('userId') || '0', 10);
  
        // Llamar al servicio para obtener las prendas existentes y obtener el último ID
        this.prendaService.listarPrendas().subscribe(
          (prendas: Prenda[]) => {
            // Obtener el último ID disponible sumando 1 al ID de la última prenda
            const nuevoId = prendas.length + 1;
  
            // Crear una nueva prenda con los datos del formulario y la imagen si está presente
            const nuevaPrenda: Prenda = {
              id: nuevoId,
              idCreador: idCreador,
              imagen: "null",
              titulo: Titulo,
              descripcion: Descripcion,
              tipo: Tipo,
            };
  
            // Llamar al servicio para agregar la nueva prenda
            this.prendaService.agregarPrenda(nuevaPrenda).subscribe(
              (response) => {
                this.mensaje = 'Prenda agregada exitosamente';
                timer(2000).subscribe(() => {
                  this.router.navigate(['/MisDisenos']).then(() => {
                    window.location.reload();
                  });
                });

              },
            );
          },
          
        );
      },
      (error) => {
        this.mensaje = 'Error al verificar la existencia de la prenda';
      }
    );
  }
  
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Mostrar vista previa de la imagen seleccionada
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadFile() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('URL_DEL_ENDPOINT_DE_CARGA', formData).subscribe(
      (response) => {
        console.log('Imagen cargada exitosamente');
        // Realiza acciones adicionales después de cargar la imagen si es necesario
      },
      (error) => {
        console.error('Error al cargar la imagen:', error);
        // Maneja el error de carga de imagen si es necesario
      }
    );
  }

  deleteImage() {
    this.previewImage = null;
  }
}
