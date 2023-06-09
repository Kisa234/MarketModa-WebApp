import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from './component/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UsuarioRegistrarComponent } from "./component/usuario/usuario-registrar/UsuarioRegistrarComponent";
import { UsuarioIngresarComponent } from './component/usuario/usuario-ingresar/usuario-ingresar.component';
import { PaginaComponent } from './component/pagina/pagina.component';
import { UsuarioMiperfilComponent } from './component/usuario/usuario-miperfil/usuario-miperfil.component';
import { UsuarioMisdisenosComponent } from './component/usuario/usuario-misdisenos/usuario-misdisenos.component';
import { PaginaMarketplaceComponent } from './component/pagina/pagina-marketplace/pagina-marketplace.component';
import { UsuarioNuevodisenoComponent } from './component/usuario/usuario-nuevodiseno/usuario-nuevodiseno.component';
import { InicioComponent } from './component/inicio/inicio.component';
import {MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule} from '@angular/common/http';
import { PrendaService } from './service/prenda.service';
import { UsuarioService } from './service/usuario.service';
import { UsuarioEditdisenoComponent } from './component/usuario/usuario-editdiseno/usuario-editdiseno.component';
import {MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    HeaderComponent,
    UsuarioIngresarComponent,
    UsuarioRegistrarComponent,
    PaginaComponent,
    UsuarioMiperfilComponent,
    UsuarioMisdisenosComponent,
    PaginaMarketplaceComponent,
    UsuarioNuevodisenoComponent,
    InicioComponent,
    UsuarioEditdisenoComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatStepperModule,
    MatIconModule,
    MatChipsModule,
    
    
  ],
  providers: [
    PrendaService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
