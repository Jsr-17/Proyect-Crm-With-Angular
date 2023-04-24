import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { ModificarComponent } from './modificar/modificar.component';
import { LectorMensajesComponent } from './lector-mensajes/lector-mensajes.component';
import { ObservacionComponent } from './observacion/observacion.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { NuevoReactiveComponent } from './nuevo-reactive/nuevo-reactive.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    ModificarComponent,
    LectorMensajesComponent,
    ObservacionComponent,
    InicioSesionComponent,
    RegistroComponent,
    NuevoReactiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
