import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { ProgressComponent } from 'src/app/pages/progress/progress.component';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit  {
  ngOnInit() {
    this.btnClass= `btn ${this.btnClass}`
  }
@Input() progreso: number =40;    /// CONEXIÓN DE LOS INCREMENTADORES 
@Input() btnClass: string ='btn btn-primary';    /// asignación de clase 

@Output() valorNuevo: EventEmitter<number>= new EventEmitter();   ///PROCESA EL INCREMENTO Y EMITE LOS VALORES 



 public  cambiarvalor(valor:number)
  {
    console.log(valor)
    console.log(this.progreso);
    if (this.progreso >=100 && valor >=0)
    {
this.valorNuevo.emit(100);
       this.progreso=100;
       return
    }

    if (this.progreso <=100 && valor==0)
    {
       this.valorNuevo.emit(0);
       this.progreso=0;
       return
      
    }

   this.progreso=  this.progreso + valor;
   this.valorNuevo.emit(this.progreso);
  }


  onChange(valor:number)
  {
    if (valor >=100)
    {
      this.progreso=100;
    } else if (valor <=0)
    {
      this.progreso=0;
    }
    else
    {
      this.progreso= valor
    }
      this.valorNuevo.emit(this.progreso);
  }

}
