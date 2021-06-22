import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styleUrls: ['./accout-settings.component.css']
})
export class AccoutSettingsComponent implements OnInit {

  public linkAttribute = document.querySelector("#theme");   // referencia al index


  constructor(private prd: SettingsService) { }

  ngOnInit(): void {

this.prd.checkCurrent();
  }
  changeTheme(tema:string){
   this.prd.changeTheme(tema);
  }


}
