import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.page.html',
  styleUrls: ['./roulette.page.scss'],
})
export class RoulettePage {
  constructor() {}

  girarRuleta() {
    const ruleta = document.getElementById('ruleta');
    const puntero = document.getElementById('puntero');

    if (ruleta && puntero) {
      const gira = 1200 + Math.random() * 1200;
      puntero.style.pointerEvents = 'none';
      ruleta.style.transition = 'all 10s ease-out';
      ruleta.style.transform = `rotate(${gira}deg`;

      ruleta.addEventListener('transitionend', () => {
        puntero.style.pointerEvents = 'auto';
        ruleta.style.transition = 'none';
        const giraDos = gira % 360;
        ruleta.style.transform = `rotate(${giraDos}deg`;
      });
    }
  }
}