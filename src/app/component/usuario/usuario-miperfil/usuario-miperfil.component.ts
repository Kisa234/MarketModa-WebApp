import { Component, OnInit } from '@angular/core';
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
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  mensaje: string = '';
  maxFecha: Date = moment().add(1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false; //no es edicion

  constructor(
    private authorService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //para obtener el routerLink de listado
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl(),
      nameAuthor: new FormControl('', [Validators.required]),
      emailAuthor: new FormControl('', [Validators.required, Validators.email]),
      birthDateAuthor: new FormControl(),
      countryUsuario: new FormControl(),
      phoneNumberUsuario : new FormControl(),
      passwordUsuario: new FormControl()
    });
  }
  init() {
    if (this.edicion) {
      this.authorService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nameAuthor: new FormControl(data.nameUsuario),
          emailAuthor: new FormControl(data.emailUsuario),
          birthDateAuthor: new FormControl(data.birthDateUsuario),
          countryUsuario: new FormControl(data.countryUsuario),
          phoneNumberUsuario : new FormControl(data.phoneNumberUsuario),
          passwordUsuario: new FormControl(data.passwordUsuario)
        });
      });
    }
  }

  aceptar(): void {
    this.usuario.id = this.form.value['id'];
    this.usuario.nameUsuario = this.form.value['nameUsuario'];
    this.usuario.emailUsuario = this.form.value['emailUsuario'];
    this.usuario.birthDateUsuario = this.form.value['birthDateUsuario'];
    this.usuario.countryUsuario = this.form.value['countryUsuario'];
    this.usuario.passwordUsuario = this.form.value['passwordUsuario'];
    this.usuario.phoneNumberUsuario =this.form.value['phoneNumberUsuario']

    if (this.form.valid) {
        if (this.edicion) {
         //  //registrarlo en la base de  datos
         //  this.authorService.update(this.usuario).subscribe((data) =>
         //    this.router.navigate(['authors']).then(() => {
         //      window.location.reload();
         //    })
         //  );
        } else {
          //registrarlo en la base de  datos
          this.authorService.insert(this.usuario).subscribe((data) =>
            this.router.navigate(['authors']).then(() => {
              window.location.reload();
            })
          );
        }
      } else{
        this.mensaje = "Agrege campos omitidos";
      }
  }
}


