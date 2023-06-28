import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Prenda } from 'src/app/model/prenda';
import { PrendaService } from 'src/app/service/prenda.service';

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

  constructor(
    private http: HttpClient,
    private prendaService: PrendaService
  ) {}

  ngOnInit(): void {
    this.id = parseInt(localStorage.getItem('idPrenda') || '0', 10);
    this.edicion = this.id !== 0;
    this.initForm();
    console.log(this.id);

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

  aceptar() {
    // Lógica para guardar los datos del formulario
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
