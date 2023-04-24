import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { LectorMensajesComponent } from './lector-mensajes/lector-mensajes.component';
import { ModificarComponent } from './modificar/modificar.component';
import { NuevoReactiveComponent } from './nuevo-reactive/nuevo-reactive.component';
import { ObservacionComponent } from './observacion/observacion.component';
import { PrincipalComponent } from './principal/principal.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path: "", component: InicioSesionComponent},
  {path:"index",component:PrincipalComponent},
  {path:"modify/:id",component:ModificarComponent},
  {path:"observation/:id",component:ObservacionComponent},
  {path:"file/:id",component:LectorMensajesComponent},
  {path:"register",component:RegistroComponent},
  {path:"new",component:NuevoReactiveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
