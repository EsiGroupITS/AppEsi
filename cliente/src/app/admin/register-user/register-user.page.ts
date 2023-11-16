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
    //Creamos el formulario y incluimos las validaciones necesarias
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/), Validators.maxLength(25),Validators.minLength(3)]],
      last_name: ['']
    });
  }
  //Verificamos si los campos son invalidos y si ademas estos fueron tocados y quedaron vacios, para mostrar un error.
  get emailInvalid() {
    return this.registerForm.get('username')?.invalid && this.registerForm.get('username')?.touched;
  }
  get passwordInvalid() {
    return this.registerForm.get('pass')?.invalid && this.registerForm.get('pass')?.touched;
  }
  get nameInvalid() {
    return this.registerForm.get('name')?.invalid && this.registerForm.get('name')?.touched;
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
      //Utilizamos el service para registrar a el usuario
      this.authService.createUser(this.registerForm.value).subscribe({
        //todo ok
        next: (data: any) => {
          //Si todo salio bien mostramos un mensaje de exito
          this.successfullyCreated
        },
        //Manejo de error.
        error: (err) => {
          // Alertamos por el error.
          //Determinamos diferentes respuestas para los diferentes codigos de estado que envia el backend
          switch (err.status) {
            //En caso de un 409, mostramos un mensaje de que el email ya esta en uso.
            case 409:
              this.handleConflictError();
              break;
            //En caso de un 500, advertimos que el servidor tuvo una falla.
            case 500:
              this.handleInternalServerError();
              break;
              //En caso que venga algun otro estado del servidor que no este contemplado, ponemos un alerta generica.
            default:
              this.presentErrorAlert();
          }
        }
      })
    }
  }
  //ERROR GENERICO
  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error al crear el usuario',
      message: 'No fue posible crear el usuario, aguarde unos minutos y inténtelo nuevamente.',
      buttons: ['OK']
    });

    await alert.present();
  }
  //ERROR 500
  async handleInternalServerError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Ocurrio un error en el servidor, intentelo nuevamente en unos minutos o comuniquese con soporte.',
      buttons: ['OK']
    });

    await alert.present();
  }
  //ERROR 409
  async handleConflictError() {
    const alert = await this.alertController.create({
      header: 'Correo existente',
      message: 'El correo ingresado ya esta en uso, porfavor ingrese otro.',
      buttons: ['OK']
    });

    await alert.present();
  }
  //SUCCESS
  async successfullyCreated () {
    const alert = await this.alertController.create({
      header: 'Operacion exitosa',
      message:'El usuario fue creado con exito.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
