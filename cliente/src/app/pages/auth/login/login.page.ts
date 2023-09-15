import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgControl, FormBuilder, MaxLengthValidator, MinLengthValidator } from '@angular/forms';

// componentes de navegacion
import { Router } from '@angular/router'

// gestion de estado
import * as uiSelectors from '../../../ui-state/selectors/ui.selectors'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// servicios propios
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: []
})

export class LoginPage implements OnInit {

  //Inicializamos el formulario
  loginForm!: FormGroup;

  //? selector para el estado de la aplicacion
  contrastBlack$: Observable<boolean | null>
  textSize$: Observable<boolean | null>
  textSpacing$: Observable<boolean | null>
  highVisibility$: Observable<boolean | null>
  dyslexicFont$: Observable<boolean | null>

  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthenticationService,
    private cookies: CookieService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,

  ) {
    this.contrastBlack$ = this.store.select(uiSelectors.selectContrast)
    this.textSize$ = this.store.select(uiSelectors.selectTextSize)
    this.textSpacing$ = this.store.select(uiSelectors.selectTextSpacing)
    this.highVisibility$ = this.store.select(uiSelectors.selectVisibility)
    this.dyslexicFont$ = this.store.select(uiSelectors.selectFontType)
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]],
    });
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
          this.addUniqueClass(['user', 'pass', 'sub-btn'], 'medium-font')
        } else {
          this.removeUniqueClass(['user', 'pass', 'sub-btn'], 'medium-font')
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
          this.addUniqueClass(['login-title', 'user', 'pass', 'sub-btn'], 'dyslexic-font')
        } else {
          this.removeUniqueClass(['login-title', 'user', 'pass', 'sub-btn'], 'dyslexic-font')
        }
      })
    })

    // texto espaciado
    this.textSpacing$.subscribe({
      next: (active => {
        if (active === true) {
          this.addUniqueClass(['user', 'pass', 'sub-btn'], 'space-letter')
        } else {
          this.removeUniqueClass(['user', 'pass', 'sub-btn'], 'space-letter')
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
  //Verificamos si el email es invalido y ademas de si el campo fue tocado y quedo vacio, mostraremos un error.
  get emailInvalid() {
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
  }
  //Verificamos si la password es invalida, y ademas de si el campo fue tocado y quedo vacio, mostramos un error.
  get passwordInvalid() {
    return this.loginForm.get('pass')?.invalid && this.loginForm.get('pass')?.touched;
  }
  ngOnDestroy(): void {

  }

  loginUser() {
    //Si al hacer el envio del formulario existe algun formulario invalido, lo marcamos.
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAllAsTouched();
      })
    } else {
      //Si el formulario es valido:
      //Utilizamos el service para logear el usuario
      this.authService.loginUser(this.loginForm.value).subscribe({
        //todo ok
        next: (data: any) => {

          //Si todo salio bien seteamos el token en las cookies
          this.cookies.set("token", data.token.access_token)
          //redirigimos al home
          this.router.navigate(['/home'])
        },
        //Manejo de error.
        error: (err) => {
          // Alertamos por el error.
          this.presentErrorAlert();
        }
      })
    }
  }
  //Creamos un alerta para mostrar al usuario si algo falla.
  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error de inicio de sesión',
      message: 'No fue posible iniciar sesión. Por favor, verifica tus credenciales e inténtalo nuevamente.',
      buttons: ['OK']
    });

    await alert.present();
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
