import { Component, OnInit  } from '@angular/core';

// componentes de navegacion
import { Router } from '@angular/router'

// gestion de estado
import * as uiSelectors from '../../../ui-state/selectors/ui.selectors'
import { Store        } from '@ngrx/store';
import { Observable   } from 'rxjs';

// servicios propios
import { AuthenticationService  } from 'src/app/services/authentication.service';
import { CookieService          } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: []
})


export class LoginPage implements OnInit {


  //? selector para el estado de la aplicacion
  contrastBlack$  : Observable<boolean | null>
  textSize$       : Observable<boolean | null>
  textSpacing$    : Observable<boolean | null>
  highVisibility$ : Observable<boolean | null>
  dyslexicFont$   : Observable<boolean | null>

  constructor(
    private router: Router,
    private store: Store,
    //Borrar si es necesario
    private authService: AuthenticationService,
    private cookies: CookieService
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
          this.addUniqueClass(['wrapper', 'form-container'], 'constrast-black')
        } else {
          this.removeUniqueClass(['wrapper', 'form-container'], 'constrast-black')
        }
      })
    })

    // aumento de texto
    this.textSize$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['username', 'pass', 'sub-btn'], 'medium-font')
        } else {
          this.removeUniqueClass(['username', 'pass', 'sub-btn'], 'medium-font')
        }
      })
    })

    // alto contraste
    this.highVisibility$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['wrapper', 'form-container', 'access-logo-ctn'], 'high-visibility')
        } else {
          this.removeUniqueClass(['wrapper', 'form-container', 'access-logo-ctn'], 'high-visibility')
        }
      })
    })

    // dislexia
    this.dyslexicFont$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['login-title', 'username', 'pass', 'sub-btn'], 'dyslexic-font')
        } else {
          this.removeUniqueClass(['login-title', 'username', 'pass', 'sub-btn'], 'dyslexic-font')
        }
      })
    })

    // texto espaciado
    this.textSpacing$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['username', 'pass', 'sub-btn'], 'space-letter')
        } else {
          this.removeUniqueClass(['username', 'pass', 'sub-btn'], 'space-letter')
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

  ngOnDestroy(): void {

  }

  loginUser() {
    //Tomamos los valores de los inputs sin ningun tipo de validacion. solo a modo de prueba
    const password = (document.getElementById('pass'    ) as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;

    const postData = {
      pass: password,
      username: username
    };

    //Utilizamos el service para logear el usuario
    this.authService.loginUser(postData).subscribe({
      //todo ok
      next: (data: any) => {
        //Si todo salio bien seteamos el token en las cookies
        this.cookies.set("token", data.token.access_token)
        //redirigimos al home
        this.router.navigate(['/home'])
      },
      //Mostramos el error por consola si es que algo fallo.
      error: (err) => {
        console.log(err)
      }
    })
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
