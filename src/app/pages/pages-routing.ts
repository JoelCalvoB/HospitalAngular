import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';


const routes: Routes =[
    {path:'dashboard', component:PagesComponent,
    canActivate:[AuthGuard],
children:[
    {   path:'', component:DashboardComponent , data:{titulo:'dashboard'}},     // se carga por defecto
    {   path:'graficas1' , component:Grafica1Component , data:{titulo:'grafiscas'}},
    {   path:'progress', component:ProgressComponent , data:{titulo:'progrees'}},
    {   path:'account-settings', component:AccoutSettingsComponent , data:{titulo:'account-settings'}},
    {path:'perfil' , component:PerfilComponent  , data:{titulo:'perfil-settings'}},
    {path:'usuarios' , component:UsuariosComponent  , data:{titulo:'usuarios-mantenimiento'}},
    {path:'hospitales' , component:HospitalesComponent  , data:{titulo:'hospitales-mantenimiento'}},
    {path:'medicos' , component:MedicosComponent  , data:{titulo:'medicos-mantenimiento'}},




]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
  