import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  private interfaz= document.querySelector("#theme");

  constructor() { 

    const url = localStorage.getItem('url')|| './assets/css/colors/purple-dark.css';
    this.interfaz?.setAttribute('href',url);
  }


  changeTheme(tema: string)
  {
    const url= `./assets/css/colors/${tema}.css`
    this.interfaz?.setAttribute('href' , url);
    localStorage.setItem('url' , url);
    this.checkCurrent();
  }


  checkCurrent()
  {
    const lista= document.querySelectorAll('.selector');
    lista.forEach(elemento =>{
  elemento.classList.remove('working');
  const btnTheme= elemento.getAttribute('data-theme');
  const valor=  `./assets/css/colors/${btnTheme}.css`
  const current = this.interfaz?.getAttribute('href');
  console.log(valor);
  console.log(current);


  if (valor === current)
  {
    elemento.classList.add('working')
  }
    })
  }


}
