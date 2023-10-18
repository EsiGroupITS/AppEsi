import { Injectable           } from '@angular/core';
import { Observable, Subject  } from 'rxjs'
import { Store                } from '@ngrx/store';
import * as uiActions           from '../ui-state/actions/ui.actions'
import { UiState } from '../ui-state/ui.state';
import { AppState } from '../app.state';

//? Interface para definir opciones de accesibilidad
export interface Option {
  title   : string,
  icon    : string,
  class   : string,
  active? : boolean
}

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private eventSubject    = new Subject<void>()
  public  event$          = this.eventSubject.asObservable()

  //? De este array construimos las opciones de accesibilidad
  options: Option[] = [
    {
      title : 'Contraste',
      icon  : 'contrast-outline',
      class : 'constrast-black',
      active: false
    },
    {
      title : 'Texto + / -',
      icon  : 'text-outline',
      class : 'medium-font',
      active: false
    },
    {
      title : 'Daltonismo',
      icon  : 'color-filter',
      class : 'high-visibility',
      active: false
    },
    {
      title : 'Dislexia',
      icon  : 'text',
      class : 'dyslexic-font',
      active: false
    },
    {
      title : 'Espacio',
      icon  : 'code-outline',
      class : 'space-letter',
      active: false
    },
    /*{
      title : 'Luminosidad',
      icon  : 'sunny-outline',
      class : 'bright',
      active: false
    }*/
  ]

  // variables para el contraste negro (MSO)
  public  contrastBlackActiveBln   : boolean             = false
  private contrastBlackActive      : Subject<boolean>    = new Subject<boolean>()
  public  contrastBlack$           : Observable<boolean> = this.contrastBlackActive.asObservable()

  //variables para el aumento de tamaño del texto (Facu)
  public  mediumFontActivateBln    : boolean             = false
  private mediumFontActive         : Subject<boolean>    = new Subject<boolean>()
  public  mediumFont$              : Observable<boolean> = this.mediumFontActive.asObservable()

  // Variables para alto contraste (Javi)
  public  highContrastActiveClr    : boolean             = false
  private highContrastActive       : Subject<boolean>    = new Subject<boolean>()
  public  highContrast$            : Observable<boolean> = this.highContrastActive.asObservable()

  // Variables para dislexia amigable (MSO)
  public  dyslexicFriendlyBln      : boolean             = false
  private dyslexicFriendlyActive   : Subject<boolean>    = new Subject<boolean>()
  public  dyslexicFriendly$        : Observable<boolean> = this.dyslexicFriendlyActive.asObservable()

  //Variables para el espaciado de letras (Moyano)
  public  mdTextSpacingActivateBln : boolean             = false
  private mdTextSpacingActive      : Subject<boolean>    = new Subject<boolean>()
  public  mdTextSpacing$           : Observable<boolean> = this.mdTextSpacingActive.asObservable()

  //variables para luminosidad
  /*public luminousActiveBln         : boolean             = false
  private luminousActive           : Subject<boolean>    = new Subject<boolean>()
  public luminousHtml$             : Observable<boolean> = this.luminousActive.asObservable()*/

  // TODO agregar variables para cada una de las opciones

  constructor(
    // eslint-disable-next-line @ngrx/no-typed-global-store
    private store: Store<AppState>
  ) { }

  emitChangesOnUI() {
    this.eventSubject.next()
  }

  // metodo para cambiar variables de contraste negro (Matias)
  changeContrastBlack() : void {
    this.contrastBlackActiveBln = !this.contrastBlackActiveBln
    this.contrastBlackActive.next(this.contrastBlackActiveBln)
    this.options[0].active      = !this.options[0].active
    this.store.dispatch(uiActions.changeContrast())
  }

  // metodo para aumentar el tamaño de las letras (Facu)
  changeMediumFont() : void {
    this.mediumFontActivateBln = !this.mediumFontActivateBln
    this.mediumFontActive.next(this.mediumFontActivateBln)
    this.options[1].active     = !this.options[1].active
    this.store.dispatch(uiActions.changeTextSize())
  }

  // Método para cambiar variables de alto contraste (Javi)
  changeHighContrast() : void {
    this.highContrastActiveClr = !this.highContrastActiveClr
    this.highContrastActive.next(this.highContrastActiveClr)
    this.options[2].active     = !this.options[2].active
    this.store.dispatch(uiActions.changeVisibility())
  }

  // metodo para cambiar variables de dislexia (MSO)
  changeToDyslexicFont() : void {
    this.dyslexicFriendlyBln = !this.dyslexicFriendlyBln
    this.dyslexicFriendlyActive.next(this.dyslexicFriendlyBln)
    this.options[3].active   = !this.options[3].active
    this.store.dispatch(uiActions.changeFontType())
  }


   //metodo para aumentar el espaciado de letras (Moyano)
  changeLetterSpacing() : void{
    this.mdTextSpacingActivateBln = !this.mdTextSpacingActivateBln
    this.mdTextSpacingActive.next(this.mdTextSpacingActivateBln)
    this.options[4].active      = !this.options[4].active
    this.store.dispatch(uiActions.changeTextSpacing())
  }

  //metodo para cambiar luminosidad
  /*changeBright() : void{
    this.luminousActiveBln  = !this.luminousActiveBln
    this.luminousActive.next(this.luminousActiveBln)
    this.options[5].active  = !this.options[5].active
    this.store.dispatch(uiActions.changeLuminosity())
  }*/

  //TODO agregar metodos para cada una de las opciones

  // switch case para pasar diferentes metodos segun el indice
  switchMethods(index: number) { // pasamos el indice como argumento
    switch (index) { // y dependiendo de la opcion que pasemos  activa el metodo que corresponde.
      case 0: // por ejemplo si el indice es 0, va a ejecutar el cambio de contraste
        this.changeContrastBlack()
        break;
      case 1:
        this.changeMediumFont()
        break
      case 2:
        this.changeHighContrast()
        break
      case 3:
        this.changeToDyslexicFont()
        break
      case 4:
        this.changeLetterSpacing()
        break
      /*case 5:
        this.changeBright()
        break*/
      // TODO ACA AGREGAR NUEVOS METODOS
      default:
        break;
    }
  }



}
