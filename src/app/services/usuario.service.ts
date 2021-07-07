import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { lista } from '../interfaces/listaUsuarios';
import { Usuario } from '../models/usuario.model';

declare const  gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public baseurl = environment.base_url;
  public auth2: any;
  public usuario: any;



  constructor(private http: HttpClient , private ngZone: NgZone ,private route: Router) { 
    this.googleInit();

  }



  get getToken(){
    return localStorage.getItem('token') || '';
  }


  get getUid()
  {
    return this.usuario.uid || '';
  }

logoutToken(){
  this.auth2.signOut().then( ()=> {
    this.ngZone.run( () =>{
      localStorage.removeItem('token');
      this.route.navigateByUrl('/login');

    })
    console.log('User signed out.');
  });

}



googleInit(){
  gapi.load('auth2',()=>{
    this.auth2 = gapi.auth2.init({
     client_id: '934892189189-97r3ftjf4e0uilta94jcte30geu9gvve.apps.googleusercontent.com',
     cookiepolicy: 'single_host_origin',
     // Request scopes in addition to 'profile' and 'email'
     //scope: 'additional_scope'
   });
});
}

validarToken(): Observable<boolean> {
    let id_token = localStorage.getItem('token') || '';
  return this.http.get(`${ this.baseurl }/login/renew`, {
    headers: {
      'x-token': this.getToken
    }
  }).pipe(
    map( (resp: any) => {
      console.log(resp);
      const { email, google, nombre, role, img = '', uid } = resp.usuario;
      this.usuario = new Usuario( role , google , nombre , email , img , uid , '');
      localStorage.setItem('token', resp.token );
      return true;
    }),
    catchError( error => of(false) )
  );

}


  crearUsuario(formData: Usuario)
  {
    
    return   this.http.post(`${this.baseurl}/usuarios`, formData);
  }



  BorrarUser(usuario: Usuario)
  {
    
    return   this.http.delete(`${this.baseurl}/usuarios/${usuario.uid}` , {  headers: {
      'x-token': this.getToken
    }});
  }




  ActualizarPerfil(data: {email:string , nombre: string , role:string})
  {
    data={
     ...data,
     role: this.usuario.role
}

    return   this.http.put(`${this.baseurl}/usuarios/${this.getUid}`, data , {  headers: {
      'x-token': this.getToken
    }});

  }

  loginUser(formData: Usuario){
    return this.http.post(`${this.baseurl}/login`, formData).pipe(
      tap( (resp:any) =>{
        localStorage.setItem('token', resp.token)
      })
    )
}



loginGoogle(token: any ){
  return this.http.post(`${this.baseurl}/login/google`, {token}).pipe(
    tap( (resp:any) =>{
      localStorage.setItem('token', resp.token)
    })
  )
}


cargarUusarios(desde:number =0){
  return  this.http.get<lista>(`${this.baseurl}/usuarios?=${desde}` , { headers: {
    'x-token': this.getToken
  }}).pipe(map(datos => {
    delay(7000)
    console.log('delay');
    const usuarios= datos.usuarios.map(resp =>
      new Usuario(resp.role , resp.google, resp.nombre , resp.email , resp.img , resp.uid! ,''
    ) );
    return {
      total: datos.total,
      usuarios
    };

  })

  )}




  ActualizarRol(usuario: Usuario)
  {
  

    return   this.http.put(`${this.baseurl}/usuarios/${usuario.uid}` , usuario, {  headers: {
      'x-token': this.getToken
    }});

  }
}
