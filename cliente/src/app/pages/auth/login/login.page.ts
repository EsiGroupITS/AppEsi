import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessibilityService } from 'src/app/services/accessibility.service';
import { AccessibilityComponent } from 'src/app/components/shared/accessibility/accessibility.component';
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AccessibilityComponent]


})
export class LoginPage implements OnInit {

  //? Variable que instanciara la suscripcion a cambios en contraste
  private contrastBlackSuscription?: Subscription;
  private mediumFontSubscription?: Subscription;
  private highContrastSubscription?: Subscription;
  private dyslexicSubscription?: Subscription;
  private mdTextSpacingSubscription?: Subscription;
  private changeBrightSuscription?: Subscription;

  constructor(
    private accService: AccessibilityService,
    private router: Router,
    private acc: AccessibilityComponent,
    //Borrar si es necesario
    private authService: AuthenticationService,
    private cookies: CookieService
  ) { }

  ngOnInit() {
    // constraste negro
    this.contrastBlackSuscription = this.accService.contrastBlack$.subscribe({
      next: (active => { // el valor del callback va a ser booleano
        if (active === true) {
          this.addUniqueClass(['wrapper', 'form-container'], 'constrast-black')
        } else {
          this.removeUniqueClass(['wrapper', 'form-container'], 'constrast-black')
        }
      })
    })

    // aumento de texto
    this.mediumFontSubscription = this.accService.mediumFont$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['user', 'pass', 'sub-btn'], 'medium-font')
        } else {
          this.removeUniqueClass(['user', 'pass', 'sub-btn'], 'medium-font')
        }
      })
    })

    // alto contraste
    this.highContrastSubscription = this.accService.highContrast$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['wrapper', 'form-container', 'access-logo-ctn'], 'high-visibility')
        } else {
          this.removeUniqueClass(['wrapper', 'form-container', 'access-logo-ctn'], 'high-visibility')
        }
      })
    })

    // dislexia
    this.dyslexicSubscription = this.accService.dyslexicFriendly$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['login-title', 'user', 'pass', 'sub-btn'], 'dyslexic-font')
        } else {
          this.removeUniqueClass(['login-title', 'user', 'pass', 'sub-btn'], 'dyslexic-font')
        }
      })
    })

    // texto espaciado
    this.mdTextSpacingSubscription = this.accService.mdTextSpacing$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['user', 'pass', 'sub-btn'], 'space-letter')
        } else {
          this.removeUniqueClass(['user', 'pass', 'sub-btn'], 'space-letter')
        }
      })
    })

    //luminosidad
    this.changeBrightSuscription = this.accService.luminousHtml$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['wrapper', 'form-container'], 'bright')
        } else {
          this.removeUniqueClass(['wrapper', 'form-container'], 'bright')
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.contrastBlackSuscription?.unsubscribe()
    this.mediumFontSubscription?.unsubscribe()
    this.highContrastSubscription?.unsubscribe()
    this.dyslexicSubscription?.unsubscribe()
    this.mdTextSpacingSubscription?.unsubscribe()
    this.changeBrightSuscription?.unsubscribe()
  }
  //Borrar si es necesario.
  // navigateLogin() {
  //   this.router.navigate(['/home'])
  // }
  loginUser() {
    //Tomamos los valores de los inputs sin ningun tipo de validacion. solo a modo de prueba
    const password = (document.getElementById('pass') as HTMLInputElement).value;
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
