import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any =[
    {
      titulo :'Dashboard!!!',
      icono:'mdi mdi-gauge',
      submenu :[
        {
          titulo:'main',
          url:'/'
        }
        ,
        {
          titulo:'ProgressBar',
          url:'progress'
        },
        {
          titulo:'Graficas',
        url:'graficas1'
        }
      ]
    }

    ,
    {
      titulo :'Mantenimiento!!!',
      icono:'mdi mdi-gauge',
      submenu :[
        {
          titulo:'Usuarios',
          url:'usuarios'
        }
        ,
        {
          titulo:'Hospitales',
          url:'hospitales'
        },
        {
          titulo:'Médicos',
        url:'medicos'
        }
      ]
    }
  ]

  constructor() { }
}
