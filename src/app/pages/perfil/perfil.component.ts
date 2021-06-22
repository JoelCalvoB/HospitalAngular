import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

public usuario: Usuario ;
public myForm: any;
public imagenNueva: any;


  
  constructor( private fb: FormBuilder , private prdUser: UsuarioService, private prdFile: UploadImageService) {
   this.usuario= this.prdUser.usuario;    /// establesco la relación al servicio
   }

  ngOnInit(): void {

      this.myForm = this.fb.group({
      nombre:[this.usuario.nombre , [Validators.required]],
      email: [this.usuario.email , [Validators.required , Validators.email]]
  })

  }


  guardar()
  {
    console.log(this.myForm.value);
    let obj= this.myForm.value;
    let {nombre , email , role  , uid} = this.myForm.value;
    this.prdUser.ActualizarPerfil(obj).subscribe(resp=>{
      console.log(resp)
      this.usuario.nombre=nombre;
      this.usuario.email= email;
      Swal.fire('Guardado' , 'SE Guardo Correctamente' ,'success')

    }), (err: any) =>{
      Swal.fire('ERROR' , err.error.msg ,'error')

    };
  }


  CambiarImagen(event: any ){
   console.log(event);
    this.imagenNueva= event.target.files[0];
    // this.imagenNueva= event;
  }


  Subir(){
  this.prdFile.subirFoto(this.imagenNueva ,'usuarios', this.usuario.uid! ).subscribe(resp =>{
    console.log(resp.nombreArchivo)
    this.usuario.img= resp.nombreArchivo;
    Swal.fire('Guardado' , 'SE Guardo Correctamente' ,'success')

  }), (err: any) =>{
    console.log('entra');
    //Swal.fire('ERROR' , err.error.msg ,'error')
  };
}

}
