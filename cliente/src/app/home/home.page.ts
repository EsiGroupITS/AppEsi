import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccessibilityService, Option } from '../services/accessibility.service';
import { Subscription                 } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  options: Option[] = []

  public saveChangesBln: boolean = false

  //? boolean para registrar si la opcion de accesibilidad esta activada
  private blackContrastBln: boolean = false;
  private mediumFotnBln   : boolean = false;
  private highContrastBln : boolean = false;
  private dyslexicFont    : boolean = false;
  private mdTextSpacing   : boolean = false;
  //private brighLightBln   : boolean = false;

  //? Variable que instanciara la suscripcion a cambios en contraste
  private contrastBlackSuscription? : Subscription;
  private mediumFontSubscription?   : Subscription;
  private highContrastSubscription? : Subscription;
  private dyslexicSubscription?     : Subscription;
  private mdTextSpacingSubscription?: Subscription;
  //private changeBrightSuscription?  : Subscription;

  constructor(
    private accService: AccessibilityService,
    private router    : Router
  ) {
    this.options = this.accService.options


    // constraste negro
    this.contrastBlackSuscription = this.accService.contrastBlack$.subscribe({
      next: (active => { // el valor del callback va a ser booleano
        if(active === true) {
          this.addUniqueClass(['home-wrapper'], 'constrast-black')
        } else {
          this.removeUniqueClass(['wrapper'], 'constrast-black')
        }
      })
    })

    // aumento de texto
    this.mediumFontSubscription = this.accService.mediumFont$.subscribe({
      next: (active => {
        if(active === true) {
          this.addUniqueClass(['user', 'pass', 'sub-btn'], 'medium-font')
        } else {
          this.removeUniqueClass(['user', 'pass', 'sub-btn'], 'medium-font')
        }
      })
    })

    // alto contraste
    this.highContrastSubscription = this.accService.highContrast$.subscribe({
      next: (active => {
        if(active === true) {
          this.addUniqueClass(['home-wrapper'], 'high-visibility')
        } else {
          this.removeUniqueClass(['wrapper'], 'high-visibility')
        }
      })
    })

    // dislexia
    this.dyslexicSubscription = this.accService.dyslexicFriendly$.subscribe({
      next: (active => {
        if(active === true) {
          this.addUniqueClass(['login-title', 'user', 'pass', 'sub-btn'], 'dyslexic-font')
        } else {
          this.removeUniqueClass(['login-title', 'user', 'pass', 'sub-btn'], 'dyslexic-font')
        }
      })
    })

    // texto espaciado
    this.mdTextSpacingSubscription = this.accService.mdTextSpacing$.subscribe({
      next: (active => {
        if(active === true) {
          this.addUniqueClass(['user', 'pass', 'sub-btn'], 'space-letter')
        } else {
          this.removeUniqueClass(['user', 'pass', 'sub-btn'], 'space-letter')
        }
      })
    })

    //luminosidad
    /*this.changeBrightSuscription = this.accService.luminousHtml$.subscribe({
      next: (active =>{
        if(active === true){
          this.addUniqueClass(['home-wrapper'], 'bright')
        } else{
          this.removeUniqueClass(['home-wrapper'], 'bright')
        }
      })
    })*/

   
  }

  ngOnInit(): void {

    // constraste negro
    this.contrastBlackSuscription = this.accService.contrastBlack$.subscribe({
      next: (active => { // el valor del callback va a ser booleano
        if(active === true) {
          this.addUniqueClass(['home-wrapper'], 'constrast-black')
        } else {
          this.removeUniqueClass(['wrapper'], 'constrast-black')
        }
      })
    })

    // aumento de texto
    this.mediumFontSubscription = this.accService.mediumFont$.subscribe({
      next: (active => {
        if(active === true) {
          this.addUniqueClass(['user', 'pass', 'sub-btn'], 'medium-font')
        } else {
          this.removeUniqueClass(['user', 'pass', 'sub-btn'], 'medium-font')
        }
      })
    })

    // alto contraste
    this.highContrastSubscription = this.accService.highContrast$.subscribe({
      next: (active => {
        if(active === true) {
          this.addUniqueClass(['home-wrapper'], 'high-visibility')
        } else {
          this.removeUniqueClass(['wrapper'], 'high-visibility')
        }
      })
    })

    // dislexia
    this.dyslexicSubscription = this.accService.dyslexicFriendly$.subscribe({
      next: (active => {
        if(active === true) {
          this.addUniqueClass(['login-title', 'user', 'pass', 'sub-btn'], 'dyslexic-font')
        } else {
          this.removeUniqueClass(['login-title', 'user', 'pass', 'sub-btn'], 'dyslexic-font')
        }
      })
    })

    // texto espaciado
    this.mdTextSpacingSubscription = this.accService.mdTextSpacing$.subscribe({
      next: (active => {
        if(active === true) {
          this.addUniqueClass(['user', 'pass', 'sub-btn'], 'space-letter')
        } else {
          this.removeUniqueClass(['user', 'pass', 'sub-btn'], 'space-letter')
        }
      })
    })

    //luminosidad
    /*this.changeBrightSuscription = this.accService.luminousHtml$.subscribe({
      next: (active =>{
        if(active === true){
          this.addUniqueClass(['home-wrapper'], 'bright')
        } else{
          this.removeUniqueClass(['home-wrapper'], 'bright')
        }
      })
    })*/
      
  }

  // switch case para pasar diferentes metodos segun el indice
  switchMethods(index: number) { // pasamos el indice como argumento
    this.accService.switchMethods(index)
  }

  activeOption(index: number) {

    // con el color del texto identificamos el elemnto HTML que representa al boton
    const btn : HTMLElement | null = document.getElementById(`btn-text${index}`   )

    switch (index) {
      case 0:
        // cuando lo presionamos se cambia el valor del booleano (true = activo, false = inactivo)
        this.blackContrastBln = !this.blackContrastBln
        // decimos que si el boton es true, active la clase 'active' del texto del boton para cambiar el color del texto
        if(this.blackContrastBln === true) {
          btn?.classList.add('active')
          this.saveChangesBln = true
        }
        // si es falso, que lo deje con el color por defecto
        else {
          btn?.classList.remove('active')
        }
        break;
      case 1:
        // cuando lo presionamos se cambia el valor del booleano (true = activo, false = inactivo)
        this.mediumFotnBln = !this.mediumFotnBln
        // decimos que si el boton es true, active la clase 'active' del texto del boton para cambiar el color del texto
        if(this.mediumFotnBln === true) {
          btn?.classList.add('active')
          this.saveChangesBln = true
        }
        // si es falso, que lo deje con el color por defecto
        else {
          btn?.classList.remove('active')
        }
        break;
      case 2:
        // cuando lo presionamos se cambia el valor del booleano (true = activo, false = inactivo)
        this.highContrastBln = !this.highContrastBln
        // decimos que si el boton es true, active la clase 'active' del texto del boton para cambiar el color del texto
        if(this.highContrastBln === true) {
          btn?.classList.add('active')
          this.saveChangesBln = true
        }
        // si es falso, que lo deje con el color por defecto
        else {
          btn?.classList.remove('active')
        }
        break;
      case 3:
        // cuando lo presionamos se cambia el valor del booleano (true = activo, false = inactivo)
        this.dyslexicFont = !this.dyslexicFont
        // decimos que si el boton es true, active la clase 'active' del texto del boton para cambiar el color del texto
        if(this.dyslexicFont === true) {
          btn?.classList.add('active')
          this.saveChangesBln = true
        }
        // si es falso, que lo deje con el color por defecto
        else {
          btn?.classList.remove('active')
        }
        break;
      case 4:
        // cuando lo presionamos se cambia el valor del booleano (true = activo, false = inactivo)
        this.mdTextSpacing = !this.mdTextSpacing
        // decimos que si el boton es true, active la clase 'active' del texto del boton para cambiar el color del texto
        if(this.mdTextSpacing === true) {
          btn?.classList.add('active')
          this.saveChangesBln = true
        }
        // si es falso, que lo deje con el color por defecto
        else {
          btn?.classList.remove('active')
        }
        break;
      /*case 5:
        this.brighLightBln = !this.brighLightBln

        if (this.brighLightBln === true){
          btn?.classList.add('active')
        }
        else{
          btn?.classList.remove('active')
        }
        break;*/

      default:
        break;
    }
    this.switchMethods(index)
  }

  addUniqueClass(ids: string[], _class: string) {
    for (let i = 0; i < ids.length; i++) {
      const e = ids[i];
      const htmlElement: HTMLElement | null = document.getElementById(e)
      htmlElement?.classList.add(_class)
    }
  }

  removeUniqueClass(ids: string[], _class: string){
    for (let i = 0; i < ids.length; i++) {
      const e = ids[i];
      const htmlElement: HTMLElement | null = document.getElementById(e)
      htmlElement?.classList.remove(_class)
    }
  }

  

}