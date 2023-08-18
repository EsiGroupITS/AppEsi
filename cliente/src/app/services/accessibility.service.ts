import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private eventSubject    = new Subject<void>()
  public  event$          = this.eventSubject.asObservable()

  // variables para el contraste negro
  public contrastBlackActiveBln: boolean = false
  private contrastBlackActive = new Subject<boolean>()
  public contrastBlack$ = this.contrastBlackActive.asObservable()

  //Variables para el espaciado de letras
  public mdTextSpacingActivateBln: boolean = false
  private mdTextSpacingActive = new Subject<boolean>()
  public mdTextSpacing$ = this.mdTextSpacingActive.asObservable()

  // TODO agregar variables para cada una de las opciones

  constructor() { }

  emitChangesOnUI() {
    this.eventSubject.next()
  }

  // metodo para cambiar variables de contraste negro
  changeContrastBlack() : void {
    this.contrastBlackActiveBln = !this.contrastBlackActiveBln
    this.contrastBlackActive.next(this.contrastBlackActiveBln) 
  }

  //metodo para aumentar el espaciado de letras
  changeLetterSpacing() : void{
    this.mdTextSpacingActivateBln = !this.mdTextSpacingActivateBln
    this.mdTextSpacingActive.next(this.mdTextSpacingActivateBln)
  }

  //TODO agregar metodos para cada una de las opciones
  
}
