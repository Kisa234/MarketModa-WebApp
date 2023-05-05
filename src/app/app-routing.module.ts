import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { UsuarioRegistrarComponent } from "./component/usuario/usuario-registrar/UsuarioRegistrarComponent";
import { UsuarioIngresarComponent } from './component/usuario/usuario-ingresar/usuario-ingresar.component';
import { UsuarioSobrenosotrosComponent } from './component/usuario/usuario-sobrenosotros/usuario-sobrenosotros.component';



const routes: Routes = [
  {
    path: 'IniciarSesion',component: UsuarioIngresarComponent 
  },
  {
    path: 'Registrar',component: UsuarioRegistrarComponent
  },
  {
    path: 'SobreNosotros', component: UsuarioSobrenosotrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
