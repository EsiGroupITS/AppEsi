import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessibilityService, Option } from '../services/accessibility.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  options: Option[] = []

  blackContrastBln: boolean = false

  constructor(
    private accService: AccessibilityService,
    private router    : Router
  ) {
    this.options = accService.options
    this.accService.contrastBlack$.subscribe( value => {
      this.blackContrastBln = value
    })
  }

  changeOptions(index: number): void {
    this.accService.switchMethods(index)
  }

  activeBtn(index: number) {
    //this.accService.changeContrastBlack()

    this.changeOptions(index)

    // con el color del texto identificamos el elemnto HTML que representa al boton
    const btn: HTMLElement | null = document.getElementById(`btn-text${index}`) 

    // decimos que si el boton es true, active la clase 'active' del texto del boton para cambiar el color del texto
    if(this.blackContrastBln === true) {
      btn?.classList.add('active')
    }
    // si es falso, que lo deje con el color por defecto 
    else {
      btn?.classList.remove('active')
    }

    this.router.navigate(['login'])
    
  }

}
