import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuario-ingresar',
  templateUrl: './usuario-ingresar.component.html',
  styleUrls: ['./usuario-ingresar.component.css'],
})
export class UsuarioIngresarComponent {
  mensaje: any;
  aceptar() {

  }
  form: FormGroup<any>;
}
