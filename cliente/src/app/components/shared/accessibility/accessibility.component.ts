import { Component, OnInit            } from '@angular/core';
import { AccessibilityService, Option } from 'src/app/services/accessibility.service';



@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss'],
})
export class AccessibilityComponent  implements OnInit {

  //? De este array construimos las opciones de accesibilidad
  options: Option[] = []

  //? boolean para registrar si la opcion de accesibilidad esta activada
  private blackContrastBln: boolean = false;
  private mediumFotnBln   : boolean = false;
  private highContrastBln : boolean = false;
  private dyslexicFont    : boolean = false;
  private mdTextSpacing   : boolean = false;
  private brighLightBln   : boolean = false;

  //TODO crear booleanos para otras opciones

  //? activar boton guardar cambios
  public saveChangesBln: boolean = false

  constructor(
    //? servicio al cual llamaremos para que dispare opciones de accesibilidad
    private accService: AccessibilityService
  ) {
    // instaciamos nuestro array desde el array de opciones del servicio
    this.options = accService.options

    //TODO hacer lo mismo aca con otras opciones
    // nos suscribimos a los cambios del booleano en el servicio:
    this.accService.contrastBlack$.subscribe( value => {
      this.blackContrastBln = value
    })

    this.accService.mediumFont$.subscribe(    value => {
      this.mediumFotnBln    = value
    })

    this.accService.highContrast$.subscribe(  value => {
      this.highContrastBln  = value
    })

    this.accService.mdTextSpacing$.subscribe( value => {
      this.mdTextSpacing    = value
    })

    this.accService.luminousHtml$.subscribe( value => {
      this.brighLightBln = value
    })


   }

  ngOnInit() {

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
      case 5:
        this.brighLightBln = !this.brighLightBln

        if (this.brighLightBln === true){
          btn?.classList.add('active')
        }
        else{
          btn?.classList.remove('active')
        }
        break;

      default:
        break;
    }
    this.switchMethods(index)
  }

}
