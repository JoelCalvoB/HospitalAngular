import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { lista } from '../interfaces/listaUsuarios';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  public baseurl = environment.base_url;

  constructor(private  http: HttpClient) { }



  get getToken(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return{
    headers: {
      'x-token': this.getToken
    }
    }
  }

  cargarUsuarios(tipo: 'usuarios' | 'medicos' | 'hospitales' , termino: ''){
    return  this.http.get<any[]>(`${this.baseurl}/todo/coleccion/${tipo}/${termino}` , { headers: {
      'x-token': this.getToken
    }}).pipe( map( (resp:any) => {
      switch(tipo)
      {
        case'usuarios':
        return this.TransformaUusarios(resp.resultados);
        break;

        default:
        return[]
      }
    }))
  }


  private TransformaUusarios (resultados : any[])
  {
    return resultados.map( resp =>       new Usuario(resp.role , resp.google, resp.nombre , resp.email , resp.img , resp.uid! ,''))
  }


}

