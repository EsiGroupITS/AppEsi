import { Component, OnInit } from '@angular/core';
import { AccessibilityService } from 'src/app/services/accessibility.service';

//? Interface para definir opciones de accesibilidad
export interface Option {
  title   : string,
  icon    : string,
  class   : string,
  active? : boolean
}

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss'],
})
export class AccessibilityComponent  implements OnInit {

  //? De este array construimos las opciones de accesibilidad
  options: Option[] = [
    {
      title: 'Contraste',
      icon: 'contrast-outline',
      class: 'contrast',
    },

    {
      title: 'Luminosidad',
      icon: 'sunny-outline',
      class: 'bright'
    },
    {
      title: 'Texto + / -',
      icon: 'text-outline',
      class: 'text-size'
    },
    {
      title: 'Zoom',
      icon: 'search-outline',
      class: 'zoom'
    },
    {
      title: 'Espaciado',
      icon: 'options-outline',
      class: 'letter-spacing'
    }
  ]

  //? boolean para registrar si la opcion de accesibilidad esta activada
  private blackContrastBln: boolean = false
  private letterSpacingBln: boolean = false

  //TODO crear booleanos para otras opciones

  constructor(
    //? servicio al cual llamaremos para que dispare opciones de accesibilidad
    private accService: AccessibilityService
  ) { }

  // al inicio del componente chequeamos cual boton esta activo
  ngOnInit() {
    this.blackContrastBln = this.accService.contrastBlackActiveBln


    //TODO hacer lo mismo aca con otras opciones
    this.letterSpacingBln = this.accService.mdTextSpacingActivateBln
  }

  // switch case para pasar diferentes metodos segun el indice
  switchMethods(index: number) { // pasamos el indice como argumento
    switch (index) { // y dependiendo de la opcion que pasemos  activa el metodo que corresponde.
      case 0: // por ejemplo si el indice es 0, va a ejecutar el cambio de contraste
        this.onChangeBlackContrast(index)
        break;
      //TODO aca agregar otros metodos para otras opciones.
      // case 1:
        // this.metodoQueCorresponda(index) 
      //break
      case 4:
        this.onChangeLetterSpacing(index)
        break;
        
      default:
        break;
    }
  }




    
  //? esta funcion esta encargada de efectuar los cambios elegidos por el usuario 
  //? requiere el idice del boton para cambiar el color de texto del mismo cuando se activa
  onChangeBlackContrast(index: number) {

    // con el color del texto identificamos el elemnto HTML que representa al boton
    const btn: HTMLElement | null = document.getElementById(`btn-text${index}`) 

    // cuando lo presionamos se cambia el valor del booleano (true = activo, false = inactivo)
    this.blackContrastBln = !this.blackContrastBln

    // decimos que si el boton es true, active la clase 'active' del texto del boton para cambiar el color del texto
    if(this.blackContrastBln === true) {
      btn?.classList.add('active')
    }
    // si es falso, que lo deje con el color por defecto 
    else {
      btn?.classList.remove('active')
    }

    // llamamos al servicio y le decimos que cambie y notifique a los componentes
    this.accService.changeContrastBlack()
  }

  //TODO crear otros metodos para aplicar otras clases
  onChangeLetterSpacing(index: number){

    const btn: HTMLElement | null = document.getElementById(`btn-text${index}`)

    this.letterSpacingBln = !this.letterSpacingBln

    if (this.letterSpacingBln === true){
      btn?.classList.add('active')
    } else  {
      btn?.classList.remove('active')
    }this.accService.changeLetterSpacing()
  }

}
