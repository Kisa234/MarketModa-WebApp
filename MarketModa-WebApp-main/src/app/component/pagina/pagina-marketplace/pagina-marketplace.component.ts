import { Component, OnInit } from '@angular/core';
import { PrendaService } from 'src/app/service/prenda.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Prenda } from 'src/app/model/prenda';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pagina-marketplace',
  templateUrl: './pagina-marketplace.component.html',
  styleUrls: ['./pagina-marketplace.component.css']
})
export class PaginaMarketplaceComponent implements OnInit {
  prendas: Prenda[];
  usuarios: Usuario[];

  constructor(
    private prendaService: PrendaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.prendaService.listarPrendas().subscribe(
      (prendas: Prenda[]) => {
        this.prendas = prendas;
      },
      (error) => {
        console.error(error);
      }
    );

    this.usuarioService.list().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getNombreUsuario(idUsuario: number): string {
    const usuario = this.usuarios.find((usuario) => usuario.id === idUsuario);

    if (usuario) {
      return usuario.nameUsuario;
    } else {
      return 'Nombre de usuario no encontrado';
    }
  }
}
