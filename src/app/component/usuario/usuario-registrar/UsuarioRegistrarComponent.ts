import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'usuario-registrar',
  templateUrl: './usuario-registrar.component.html',
  styleUrls: ['./usuario-registrar.component.css'],
})
export class UsuarioRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  mensaje: string = '';
  maxFecha: Date = moment().add(1, 'days').toDate();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nameUsuario: new FormControl(),
      emailUsuario: new FormControl(),
      passwordUsuario: new FormControl(),
      birthDateUsuario: new FormControl(),
      phoneNumberUsuario: new FormControl(),
      countryUsuario: new FormControl(),
    });
  }

  Registarse(): void {
    // Obtener los datos del formulario
    const nameUsuario = this.form.value['nameUsuario'];
    const emailUsuario = this.form.value['emailUsuario'];
    const passwordUsuario = this.form.value['passwordUsuario'];
    const birthDateUsuario = this.form.value['birthDateUsuario'];
    const phoneNumberUsuario = this.form.value['phoneNumberUsuario'];
    const countryUsuario = this.form.value['countryUsuario'];

    // Verificar si algún campo está vacío
    if (

      !nameUsuario ||
      !emailUsuario ||
      !passwordUsuario ||
      !birthDateUsuario ||
      !phoneNumberUsuario ||
      !countryUsuario
    ) {
      this.mensaje = 'Por favor, complete todos los campos del formulario.';
      return;
    }

    // Verificar si ya existe un usuario con el mismo correo electrónico, número de teléfono o nombre de usuario
    this.usuarioService.list().subscribe((usuarios: Usuario[]) => {
      const usuarioExistente = usuarios.find(
        (usuario) =>
          usuario.emailUsuario === emailUsuario ||
          usuario.phoneNumberUsuario === phoneNumberUsuario ||
          usuario.nameUsuario === nameUsuario
      );

      if (usuarioExistente) {
        this.mensaje = 'El correo electrónico, número de teléfono o nombre de usuario ya están registrados.';
      } else {
        // Obtener el último ID existente
        const lastId = Math.max(...usuarios.map((usuario) => usuario.id));
        const nuevoUsuario: Usuario = {
          id: lastId + 1,
          nameUsuario: nameUsuario,
          birthDateUsuario: birthDateUsuario,
          emailUsuario: emailUsuario,
          passwordUsuario: passwordUsuario,
          phoneNumberUsuario: phoneNumberUsuario,
          countryUsuario: countryUsuario,
          imagen: ""
        };

        // Agregar el nuevo usuario utilizando el servicio
        this.usuarioService.insert(nuevoUsuario).subscribe(() => {
          this.mensaje = 'Usuario registrado exitosamente.';
          timer(2000).subscribe(() => {
            this.router.navigate(['IniciarSesion']).then(() => {
              window.location.reload();
            });
          });
        });
      }
    });
    
  }
  
}
