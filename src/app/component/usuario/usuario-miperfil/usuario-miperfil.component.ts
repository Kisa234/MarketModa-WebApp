import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-miperfil',
  templateUrl: './usuario-miperfil.component.html',
  styleUrls: ['./usuario-miperfil.component.css']
})
export class UsuarioMiperfilComponent implements OnInit {

  form: FormGroup;
  usuario: Usuario = new Usuario();
  mensaje: string = '';
  maxFecha: Date = moment().add(1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;
  selectedFile: File;
  previewImage: string | ArrayBuffer | null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = parseInt(localStorage.getItem('userId') || '0', 10);
    this.edicion = this.id !== 0;
    this.initForm();
    this.loadUserImage();
  }

  initForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      nameUsuario: new FormControl('', [Validators.required]),
      emailUsuario: new FormControl('', [Validators.required, Validators.email]),
      birthDateUsuario: new FormControl(),
      countryUsuario: new FormControl(),
      phoneNumberUsuario: new FormControl(),
      passwordUsuario: new FormControl()
    });

    if (this.edicion) {
      this.usuarioService.listId(this.id).subscribe((data: Usuario) => {
        this.usuario = data;
        this.form.patchValue({
          id: this.usuario.id,
          nameUsuario: this.usuario.nameUsuario,
          emailUsuario: this.usuario.emailUsuario,
          birthDateUsuario: this.usuario.birthDateUsuario,
          countryUsuario: this.usuario.countryUsuario,
          phoneNumberUsuario: this.usuario.phoneNumberUsuario,
          passwordUsuario: this.usuario.passwordUsuario
        });
      });
    }
  }

  loadUserImage(): void {
    if (this.id !== 0) {
      this.usuarioService.listId(this.id).subscribe((data: Usuario) => {
        this.usuario = data;
        if (this.usuario.imagen) {
          const imageUrl = `${this.usuario.imagen}`;
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

  aceptar(): void {
    const formValues = this.form.value;
    this.usuario.id = formValues.id;
    this.usuario.nameUsuario = formValues.nameUsuario;
    this.usuario.emailUsuario = formValues.emailUsuario;
    this.usuario.birthDateUsuario = formValues.birthDateUsuario;
    this.usuario.countryUsuario = formValues.countryUsuario;
    this.usuario.phoneNumberUsuario = formValues.phoneNumberUsuario;
    this.usuario.passwordUsuario = formValues.passwordUsuario;

   // if (this.form.valid) {
   //   if (this.edicion) {
   //     // Lógica para editar el usuario
   //     this.usuarioService.edit(this.usuario).subscribe(() => {
   //       console.log('Usuario editado exitosamente');
   //     }, error => {
   //       console.error('Error al editar el usuario:', error);
   //     });
   //   } else { 
   //   this.mensaje = 'Agregue campos omitidos';
   // }
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
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>('URL_DEL_ENDPOINT_DE_CARGA', formData).subscribe(
        (response) => {
          console.log('Imagen cargada exitosamente');
          // Realiza acciones adicionales después de cargar la imagen si es necesario
          // Por ejemplo, puedes actualizar el usuario con la nueva ruta de la imagen
          this.usuario.imagen = response.filePath;
        },
        (error) => {
          console.error('Error al cargar la imagen:', error);
          // Maneja el error de carga de imagen si es necesario
        }
      );
    }
  }

  deleteImage() {
    this.previewImage = null;
    // También puedes enviar una solicitud al servidor para eliminar la imagen actual
    // Si el servidor proporciona un endpoint para eliminar imágenes
  }
}
