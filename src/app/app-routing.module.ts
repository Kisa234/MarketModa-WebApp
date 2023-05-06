import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { UsuarioRegistrarComponent } from "./component/usuario/usuario-registrar/UsuarioRegistrarComponent";
import { UsuarioIngresarComponent } from './component/usuario/usuario-ingresar/usuario-ingresar.component';
import { UsuarioSobrenosotrosComponent } from './component/usuario/usuario-sobrenosotros/usuario-sobrenosotros.component';
import { PaginaComponent } from './component/pagina/pagina.component';
import { UsuarioMiperfilComponent } from './component/usuario/usuario-miperfil/usuario-miperfil.component';
import { UsuarioMisdisenosComponent } from './component/usuario/usuario-misdisenos/usuario-misdisenos.component';
import { PaginaMarketplaceComponent } from './component/pagina/pagina-marketplace/pagina-marketplace.component';
import { UsuarioNuevodisenoComponent } from './component/usuario/usuario-nuevodiseno/usuario-nuevodiseno.component';



const routes: Routes = [
  {
    path: 'IniciarSesion',component: UsuarioIngresarComponent 
  },
  {
    path: 'Registrar',component: UsuarioRegistrarComponent
  },
  {
    path: 'SobreNosotros', component: UsuarioSobrenosotrosComponent
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
