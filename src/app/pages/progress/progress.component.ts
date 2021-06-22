import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {


  progreso1:number=25;
  progreso2:number=25;


  constructor() { }

  ngOnInit(): void {
  }

  get getProgreso1()
  {
    return `${this.progreso1}%`;     ////// REGRESA EL ANCHO DE LAS BARRAS DE PROGRESO
  }


  get getProgreso2()
  {
    return `${this.progreso2}%`;
  }





}


