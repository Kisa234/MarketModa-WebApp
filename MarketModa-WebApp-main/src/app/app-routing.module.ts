import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { UsuarioRegistrarComponent } from "./component/usuario/usuario-registrar/UsuarioRegistrarComponent";
import { UsuarioIngresarComponent } from './component/usuario/usuario-ingresar/usuario-ingresar.component';
import { PaginaComponent } from './component/pagina/pagina.component';
import { UsuarioMiperfilComponent } from './component/usuario/usuario-miperfil/usuario-miperfil.component';
import { UsuarioMisdisenosComponent } from './component/usuario/usuario-misdisenos/usuario-misdisenos.component';
import { PaginaMarketplaceComponent } from './component/pagina/pagina-marketplace/pagina-marketplace.component';
import { UsuarioNuevodisenoComponent } from './component/usuario/usuario-nuevodiseno/usuario-nuevodiseno.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { UsuarioEditdisenoComponent } from './component/usuario/usuario-editdiseno/usuario-editdiseno.component';



const routes: Routes = [
  { 
    path: '', component: InicioComponent 
  },
  {
    path: 'IniciarSesion',component: UsuarioIngresarComponent 
  },
  {
    path: 'Registrar',component: UsuarioRegistrarComponent
  },
  
  {
    path: 'Inicio', component: PaginaComponent, children:[
      {
        path: 'MiPerfil', component: UsuarioMiperfilComponent,
      },
      {
        path: 'MisDisenos', component: UsuarioMisdisenosComponent,
      },
      {
        path: 'MarketPlace', component: PaginaMarketplaceComponent,
      },
      {
        path: 'NuevoDiseno', component: UsuarioNuevodisenoComponent,
      },
      {
        path: 'EditarDiseno', component: UsuarioEditdisenoComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
