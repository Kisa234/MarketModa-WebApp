import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';


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

  constructor(private UsuarioService: UsuarioService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      nameUsuario: new FormControl(),
      emailUsuario: new FormControl(),
      passwordUsuario: new FormControl(),
      birthDateUsuario: new FormControl(),
      phoneNumberUsuario: new FormControl(),
      countryUsuario: new FormControl(),
    });
  }

  aceptar(): void {
    this.usuario.id = this.form.value['id'];
    this.usuario.nameUsuario = this.form.value['nameUsuario'];
    this.usuario.emailUsuario = this.form.value['emailUsuario'];
    this.usuario.passwordUsuario = this.form.value['passwordUsuario'];
    this.usuario.birthDateUsuario = this.form.value['birthDateUsuario'];
    this.usuario.phoneNumberUsuario = this.form.value['phoneNumberUsuario'];
    this.usuario.countryUsuario = this.form.value['countryUsuario'];
    if (this.form.value['nameUsuario'].length > 0 &&
      this.form.value['emailUsuario'].length > 0) {
      this.UsuarioService.insert(this.usuario).subscribe((data) => this.router.navigate(['Iniciar Sesion']).then(() => {
        window.location.reload();
      })
      );
    } else {
      this.mensaje = 'Agregue los campos omitidos.';
    }
  }

}
