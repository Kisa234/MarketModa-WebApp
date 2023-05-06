import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-ingresar',
  templateUrl: './usuario-ingresar.component.html',
  styleUrls: ['./usuario-ingresar.component.css'],
})
export class UsuarioIngresarComponent {
  mensaje: any;
  form: FormGroup = new FormGroup({});
  Usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false; //no es edicion

  constructor(
    private UsuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.Init();
    });
  this.form = new FormGroup({
    emailUsuario: new FormControl(),
    passwordUsuario: new FormControl(),
  });
  }
  Init() {
    if (this.edicion) {
      this.UsuarioService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nameUsuario: new FormControl(data.nameUsuario),
          emailUsuario: new FormControl(data.emailUsuario),
          passwordUsuario: new FormControl(data.passwordUsuario),
        });
      });
    }
  }
  IniciarSesion(): void {}

  }
