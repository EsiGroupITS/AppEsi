import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {FormGroup, Validators,FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  registerForm!: FormGroup;

  constructor(    
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]],
    });
  }
  get emailInvalid() {
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }
  //Verificamos si la password es invalida, y ademas de si el campo fue tocado y quedo vacio, mostramos un error.
  get passwordInvalid() {
    return this.registerForm.get('pass')?.invalid && this.registerForm.get('pass')?.touched;
  }
  ngOnDestroy(): void {

  }

  registerUser() {
    //Si al hacer el envio del formulario existe algun formulario invalido, lo marcamos.
    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach(control => {
        control.markAllAsTouched();
      })
    } else {
      //Si el formulario es valido:
      //Utilizamos el service para logear el usuario
      this.authService.createUser(this.registerForm.value).subscribe({
        //todo ok
        next: (data: any) => {
          //Si todo salio bien mostramos un mensaje de exito
          this.successfullyCreated
        },
        //Manejo de error.
        error: (err) => {
          // Alertamos por el error.
          this.presentErrorAlert();
        }
      })
    }
  }
  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error al crear el usuario',
      message: 'No fue posible crear el usuario, aguarde unos minutos y inténtelo nuevamente.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async successfullyCreated () {
    const alert = await this.alertController.create({
      header: 'Operacion exitosa',
      message:'El usuario fue creado con exito, ya puede entrar',
      buttons: ['OK']
    });
    await alert.present();
  }
}
