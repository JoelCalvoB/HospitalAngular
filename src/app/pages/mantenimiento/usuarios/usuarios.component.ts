import { Component, OnInit } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number =0;
  public usuarios : Usuario[] =[];
  public Tmpusuarios : Usuario[] =[];

  public desde: number = 0;
  public cargando: boolean = true;

  public tipo:any ="";


  constructor( private prdUser: UsuarioService , private prdBusqueda : BusquedasService , private modalImagen: ModalImagenService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.modalImagen.nuevaImagen.pipe(delay(100)).subscribe(img =>{
      this.cargarUsuarios();
    })
  }


  cargarUsuarios(){
    this.cargando= true;
    this.prdUser.cargarUusarios(this.desde).subscribe(({total , usuarios}) =>{
      this.totalUsuarios= total;
this.usuarios= usuarios;
this.Tmpusuarios= usuarios;
setTimeout(() => {
  this.cargando= false;

}, 900);
  console.log(this.cargando);
    } )
  }

  UsuarioSiguiente(valor: number){
    console.log(this.desde)
     this.desde += valor;
     if (this.desde < 0){
       this.desde= 0;
     }
     else if (this.desde > this.totalUsuarios)
     {
       this.desde -= valor;
     }
     this.cargarUsuarios();
  }

  Busqueda(tipo: any){
if (tipo.length ==0)
{
  this.usuarios = this.Tmpusuarios;
}
else
{
  this.prdBusqueda.cargarUsuarios('usuarios',tipo).subscribe(resp =>{
    this.usuarios= resp
    console.log(resp);
  })
}
}

BorrarUser(usuario: Usuario){

  Swal.fire({
    title: 'Deseas Borrarlo?',
    text: "ESte proceso lo eliminará!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Borralo!'
  }).then((result) => {
    if (result.isConfirmed) {
    

      this.prdUser.BorrarUser(usuario).subscribe(
        res => {
          console.log(res)
        this.cargarUsuarios();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        }
      );
    }
  })
}


CambiarRole(usuario: Usuario){
  console.log(usuario);
 this.prdUser.ActualizarRol(usuario).subscribe(resp =>{
  Swal.fire(
    'Actualizado!',
    'Correcto.',
    'success'
  )
 })
}


abrirModal(usuario: Usuario)
{
  this.modalImagen.abrirModal('usuarios' , usuario.uid! , usuario.img);
}

}
