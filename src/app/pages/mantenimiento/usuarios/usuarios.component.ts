import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor( private prdUser: UsuarioService) { }

  ngOnInit(): void {

    this.prdUser.cargarUusarios(5).subscribe( dtaos=>
      console.log(dtaos));
  }

}
