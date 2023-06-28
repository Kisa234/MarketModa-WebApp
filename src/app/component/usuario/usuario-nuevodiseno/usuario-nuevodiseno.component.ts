import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario-nuevodiseno',
  templateUrl: './usuario-nuevodiseno.component.html',
  styleUrls: ['./usuario-nuevodiseno.component.css']
})
export class UsuarioNuevodisenoComponent {
  mensaje: any;
  selectedFile: File;
  previewImage: string | ArrayBuffer | null;

  constructor(private http: HttpClient) {}

  aceptar(){
    
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