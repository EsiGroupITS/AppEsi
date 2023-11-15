import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicSafeString } from '@ionic/angular';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.page.html',
  styleUrls: ['./roulette.page.scss'],
})
export class RoulettePage {

  constructor(private alertController: AlertController, private ar: ActivatedRoute, private router: Router) { } // Inyecta el AlertController
  ngOnInit() {

  }
  async girarRuleta() {
    const ruleta = document.getElementById('ruleta');
    const puntero = document.getElementById('puntero');
  
    if (ruleta && puntero) {
      const gira = 1200 + Math.random() * 1200;
      puntero.style.pointerEvents = 'none';
      ruleta.style.transition = 'all 10s ease-out';
      ruleta.style.transform = `rotate(${gira}deg)`;
  
      ruleta.addEventListener('transitionend', async () => {
        puntero.style.pointerEvents = 'auto';
        ruleta.style.transition = 'none';
        const giraDos = gira % 360;
  
        // Calcula la posición de la ruleta
        const posicion = (giraDos + 360) % 360;
  
        // Determina el mensaje según la posición
        var mensaje = 't';
        switch (true) {
          case posicion >= 0 && posicion < 90.01:
            mensaje = 'ENFERMEDADES';
            break;
          case posicion >= 90.01 && posicion < 180.45:
            mensaje = 'RELACIONES';
            break;
          case posicion >= 180.45 && posicion < 269.34:
            mensaje = 'CONSENTIMIENTO';
            break;
          default:
            mensaje = 'GENERO';
        }
  
        let img = '../../../../assets/img/imagen_alerta.png';
        // Muestra un alert con el mensaje
        const alert = await this.alertController.create({
          message: new IonicSafeString(`<img src="${img}" alt="photo"  /> Te deseamos suerte, tomate tu tiempo`),
          cssClass: 'alertText',
          header: mensaje,
          mode: 'ios',
          backdropDismiss: false,
          buttons: [{
            text: 'IR A LAS PREGUNTAS',
            handler: () => {
              this.router.navigate(['roulette', 'questions', mensaje]);
            }
          }]
        });
        await alert.present();
      });
    }
  }

}