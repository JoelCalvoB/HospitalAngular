import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing';

import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { PagesRoutingModule } from './pages/pages-routing';


const routes: Routes = [
 // {path:'' , loadChildren:() => import('./pages/pages.module').then(m=> m.PagesModule)},

{path:'' , redirectTo:'/dashboard', pathMatch:'full'},   //path redirecciona a dash que es pagesrouting


  {path:'**' , component:NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PagesRoutingModule,
AuthRoutingModule],   /// importación ruta hija
  exports: [RouterModule]
})
export class AppRoutingModule { }
