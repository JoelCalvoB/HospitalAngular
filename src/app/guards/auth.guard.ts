import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private prd: UsuarioService , private router: Router){

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.prd.validarToken().pipe(tap(autenticado =>{
      console.log(autenticado);
      if (!autenticado)
      {
this.router.navigateByUrl('/login');
      }
    }));
  }
  
}
