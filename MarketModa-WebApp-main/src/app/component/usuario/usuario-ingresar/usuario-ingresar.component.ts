import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-usuario-ingresar',
  templateUrl: './usuario-ingresar.component.html',
  styleUrls: ['./usuario-ingresar.component.css'],
})
export class UsuarioIngresarComponent {
  form: FormGroup = new FormGroup({
    emailUsuario: new FormControl('', [Validators.required]),
    passwordUsuario: new FormControl('', [Validators.required])
  });

  usuarios: Usuario[] = [];
  mensaje: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  IniciarSesion(): void {
    const email = this.form.get('emailUsuario')?.value;
    const password = this.form.get('passwordUsuario')?.value;
  
    this.usuarioService.list().subscribe((usuarios) => {
      this.usuarios = usuarios;
  
      const usuario = this.usuarios.find(
        (u) => u.emailUsuario === email && u.passwordUsuario === password
      );
  
      if (usuario) {
        this.mensaje = 'Inicio de sesión exitoso';
        localStorage.setItem('userId', usuario.id.toString());
        timer(2000).subscribe(() => {
          this.router.navigate(['/Inicio']).then(() => {
            window.location.reload();
          });
        });
      } else {
        this.mensaje = 'Usuario y/o contraseña incorrectos';
      }
    });
  }

  IniciarSesion2(): void {
    const email = this.form.get('emailUsuario')?.value;
    const password = this.form.get('passwordUsuario')?.value;
  
    this.usuarioService.list().subscribe((usuarios) => {
      this.usuarios = usuarios;
  
      const usuario = this.usuarios.find(
        (u) => u.emailUsuario === email && u.passwordUsuario === password
      );
  
      if (usuario) {
        this.mensaje = 'Inicio de sesión exitoso';
        localStorage.setItem('userId', usuario.id.toString());
        timer(2000).subscribe(() => {
          this.router.navigate(['/Inicio']).then(() => {
            window.location.reload();
          });
        });
      } else {
        // Si no se encontró el usuario en el servicio, buscar en el localStorage
        const usuariosLocalStorage: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioLocalStorage = usuariosLocalStorage.find(
          (u) => u.emailUsuario === email && u.passwordUsuario === password
        );
  
        if (usuarioLocalStorage) {
          this.mensaje = 'Inicio de sesión exitoso';
          localStorage.setItem('userId', usuarioLocalStorage.id.toString());
          timer(2000).subscribe(() => {
            this.router.navigate(['/Inicio']).then(() => {
              window.location.reload();
            });
          });
        } else {
          this.mensaje = 'Usuario y/o contraseña incorrectos';
        }
      }
    });
  }
  
}
