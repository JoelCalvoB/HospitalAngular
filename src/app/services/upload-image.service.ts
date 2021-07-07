import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  public base_url = environment.base_url;
  public imagen: any

  constructor(private http: HttpClient  , private prdUser: UsuarioService) { 
  }



  subirFoto(archivo: File, tipo: string, id: string):Observable<any>{
    let url= `${this.base_url}/upload/${tipo}/${id}`;
    let formData = new FormData();
    formData.append('imagen', archivo )
    console.log(formData);
    return this.http.put(url , formData , {  headers: {
      'x-token': this.prdUser.getToken
    } } )
  }




  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {

    try {

      const url = `${ this.base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if ( data.ok ) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false;    
    }

  }

  
}
