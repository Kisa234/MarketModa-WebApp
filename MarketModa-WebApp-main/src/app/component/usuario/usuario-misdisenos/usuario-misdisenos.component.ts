import { Component, OnInit } from '@angular/core';
import { PrendaService } from '../../../service/prenda.service';
import { Prenda } from '../../../model/prenda';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-misdisenos',
  templateUrl: './usuario-misdisenos.component.html',
  styleUrls: ['./usuario-misdisenos.component.css']
})
export class UsuarioMisdisenosComponent implements OnInit {
  prendas: Prenda[];

  constructor(private prendaService: PrendaService, private router: Router) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId'); // Obtener el ID del usuario del localStorage
    this.prendaService.listarPrendasPorIdCreador(Number(userId)).subscribe(
      (prendas: Prenda[]) => {
        this.prendas = prendas;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  navigateToDiseno(event: any) {
    const prendaId = event.target.getAttribute('data-prenda-id');
    if (prendaId) {
      localStorage.setItem('idPrenda', prendaId);
      this.router.navigate(['/Inicio/EditarDiseno']);
    }
  }
  
}
