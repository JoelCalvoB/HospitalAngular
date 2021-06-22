import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario ;

  public imagen: string="";

  constructor(private usuarioService: UsuarioService) { 
    this.usuario= this.usuarioService.usuario;

  }

  ngOnInit(): void {

  }


 public  logout()
  {
     this.usuarioService.logoutToken();
  }

}
