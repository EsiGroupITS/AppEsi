import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

// componentes de slider
import { register     } from 'swiper/element'
import { IonicSlides  } from '@ionic/angular';

// componentes de navegacion
import { Router } from '@angular/router';

// componentes para manejo del estado
import { Observable   } from 'rxjs';
import { Store        } from '@ngrx/store';
import * as uiSelectors from 'src/app/ui-state/selectors/ui.selectors';


// swiperjs metodo principal
register()

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  // detectamos los elementos hijos de Swiper
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiperModules = [IonicSlides]         // le pasamos a swiper los modulos de IonicSlides

  // variables de swiper, logica propia
  slideIndex  :   number  = 0             // indice del slide
  backDisabled:   boolean = true          // desactivar el boton de regreso (indice 0)
  nextDisabled:   boolean = false         // desactivar el boton de siguiente (indice 2)
  bullet1:        boolean = true          // activar bullet1
  bullet2:        boolean = false         // activar bullet2
  bullet3:        boolean = false         // activar bullet3
  nextButtonText: string  = 'Siguiente'    // texto del boton siguiente (Siguente || Comenzar!)


  //? boolean para la propiedad pulse
  pulse: boolean = true


  //? selectores para el estado de la aplicacion
  contrastBlack$  : Observable<boolean | null>
  textSize$       : Observable<boolean | null>
  textSpacing$    : Observable<boolean | null>
  highVisibility$ : Observable<boolean | null>
  dyslexicFont$   : Observable<boolean | null>

  constructor(
    // necesitamos usar Router para navegar al login
    private router: Router,
    // importamos store para revisar cambios de estado
    private store: Store
  ) {
      this.contrastBlack$   = this.store.select(uiSelectors.selectContrast)
      this.textSize$        = this.store.select(uiSelectors.selectTextSize)
      this.textSpacing$     = this.store.select(uiSelectors.selectTextSpacing)
      this.highVisibility$  = this.store.select(uiSelectors.selectVisibility)
      this.dyslexicFont$    = this.store.select(uiSelectors.selectFontType)
   }

  ngOnInit() {
     // constraste negro
     this.contrastBlack$.subscribe({
      next: (active => { // el valor del callback va a ser booleano
            if (active === true) {
              this.addUniqueClass(['swiper-sl', 'swiper-sl2', 'swiper-sl3', 'swiper', 'bullets'], 'constrast-black')
            } else {
              this.removeUniqueClass(['swiper-sl', 'swiper-sl2', 'swiper-sl3', 'swiper', 'bullets'], 'constrast-black')
            }
          })
     })
    // aumento de texto
    this.textSize$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['swiper-sl', 'swiper-sl2', 'swiper-sl3', 'swiper', 'bullets'], 'medium-font')
        } else {
          this.removeUniqueClass(['swiper-sl', 'swiper-sl2', 'swiper-sl3', 'swiper', 'bullets'], 'medium-font')
        }
      })
    })

    // alto contraste
    this.highVisibility$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(
            [
              'swiper-sl',
              'swiper-sl2',
              'swiper-sl3',
              'swiper',
              'ion-content'
            ], 'high-visibility')
        } else {
          this.removeUniqueClass(['swiper-sl', 'swiper-sl2', 'swiper-sl3', 'swiper'], 'high-visibility')
        }
      })
    })

    // dislexia
    this.dyslexicFont$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['swiper-sl', 'swiper-sl2', 'swiper-sl3', 'swiper'], 'dyslexic-font')
        } else {
          this.removeUniqueClass(['swiper-sl', 'swiper-sl2', 'swiper-sl3', 'swiper'], 'dyslexic-font')
        }
      })
    })

    // texto espaciado
    this.textSpacing$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['swiper-sl', 'swiper-sl2', 'swiper-sl3', 'swiper', 'bullets'], 'space-letter')
        } else {
          this.removeUniqueClass(['swiper-sl', 'swiper-sl2', 'swiper-sl3', 'swiper', 'bullets'], 'space-letter')
        }
      })
    })

    //luminosidad
    // this.changeBrightSuscription = this.accService.luminousHtml$.subscribe({
    //   next: (active => {
    //     if (active === true) {
    //       this.addUniqueClass(['wrapper', 'form-container'], 'bright')
    //     } else {
    //       this.removeUniqueClass(['wrapper', 'form-container'], 'bright')
    //     }
    //   })
    // })

  }

  //! funcion para moverse a la izquierda
  previous() {
    this.slideIndex-- // -> cada vez que volvemos restamos un indice

    // si el indice de las slides es 0
    if(this.slideIndex === 0) {
      this.backDisabled = true  // -> desactivamos el boton previous
      this.bullet2      = false // -> desactivamos el bullet 2
      this.bullet1      = true  // -> activamos el bullet 1
      this.pulse        = !this.pulse  // -> activamos el pulso
    } else {
      // si no es el indice 0, solo puede ser el indice 1
      this.bullet3      = false // -> el bullet 3 se desactiva
      this.bullet2      = true  // -> el bullet 2 se activa
      //this.pulse        = !this.pulse  // -> activamos el pulso
    }

    // funcion de swiper para moverse entre slides
    this.swiperRef?.nativeElement.swiper.slidePrev()
  }

  // -------------------------------------------------- //

  //! funcion para moverse a la derecha
  next() {
    // si el bullet 3 esta activado, quioere decir que estamos en la ultima slide
    if(this.bullet3) {
      // por ende estamos listos para navegar al login
      this.router.navigate(['login'])
    }
    // si navegamos hacia delante, el primer bullet se desactiva
    this.bullet1 =      false
    this.slideIndex++ // ->  sumamos al contador del indice
    if(this.pulse === true) {
      this.pulse = !this.pulse // -> desactivamos el pulso
    }
    // si el indice es el uno
    if(this.slideIndex === 1){
      this.bullet2 =    true // el bullet activo es el dos
    }
    else {
      // si no es el uno, no queda otra que el indice sea el 2, por ende
      this.bullet2 =    false             // ->  desactivamos el bullet 2
      this.bullet3 =    true              // -> activamos el bullet 3
      this.nextButtonText = 'Comenzar!'   // -> cambiamos el texto del boton
    }

    // como es obvio que no estamos en la slide 0, podemos activar el boton de previous
    this.backDisabled = false

    // usamos la funcion de swiper para avanzar de slide
    this.swiperRef?.nativeElement.swiper.slideNext()

  }


  addUniqueClass(ids: string[], _class: string) {
    for (let i = 0; i < ids.length; i++) {
      const e = ids[i];
      const htmlElement: HTMLElement | null = document.getElementById(e)
      htmlElement?.classList.add(_class)
    }
  }

  removeUniqueClass(ids: string[], _class: string) {
    for (let i = 0; i < ids.length; i++) {
      const e = ids[i];
      const htmlElement: HTMLElement | null = document.getElementById(e)
      htmlElement?.classList.remove(_class)
    }
  }

}
