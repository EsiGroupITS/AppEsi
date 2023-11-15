import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { GeneralServiceService } from 'src/app/services/general-service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  question: any;
  answer0: any;
  answer1: any;
  answer2: any;
  answer3: any;
  answers: any;
  correct_answer: any;
  selectedAnswer?: string; // Variable para almacenar la respuesta seleccionada
  answered = false; // Variable para verificar si el usuario ya respondió

  constructor(private gs: GeneralServiceService, private route: ActivatedRoute, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const mensaje = params.get('mensaje');
      if (mensaje) {
        // Aquí puedes hacer lo que desees con el parámetro "mensaje"
        if (mensaje === "ENFERMEDADES") {
          const mensaje = 'ets'
          this.getQuestions(mensaje)
        }
        else {
          this.getQuestions(mensaje);
        }
      }
    });
  }

  async checkAnswer(selectedAnswer: string) {
    if (!this.answered) { // Solo permitir seleccionar una respuesta si no se ha respondido aún
      this.selectedAnswer = selectedAnswer; // Almacenamos la respuesta seleccionada
      this.answered = true; // Marcamos la pregunta como seleccionada
      if (selectedAnswer === this.correct_answer) {
        let img = '.../../../../../../../assets/img/emoji_questions_correct.png';
        // Muestra un alert con el mensaje
        const alert = await this.alertController.create({
          message: new IonicSafeString(`<img src="${img}" alt="photo"  /> Nos pone muy contento que estes tan informado!`),
          cssClass: 'alertTextAnswers',
          header: 'CORRECTO',
          mode: 'ios',
          backdropDismiss: false,
          buttons: [{
            text: 'VOLVER',
            handler: () => {
              this.router.navigate(['roulette']);
            }
          }]
        })
        setTimeout(()=>alert.present(),2000);
      } else {
        let img = '.../../../../../../../assets/img/emoji_questions_incorrect.png';
        // Muestra un alert con el mensaje
        const alert = await this.alertController.create({
          message: new IonicSafeString(`<img src="${img}" alt="photo"  /> No pierdas el interes, hay que probar para aprender!`),
          cssClass: 'alertTextAnswers',
          header: 'INCORRECTO',
          mode: 'ios',
          backdropDismiss: false,
          buttons: [{
            text: 'VOLVER',
            handler: () => {
              this.router.navigate(['roulette']);
            }
          }]
        })
        setTimeout(()=>alert.present(),2000);
      }
    }
  }

  getQuestions(mensaje: string) {
    
    this.gs.getQuestions(mensaje).subscribe({
      next: (data: any) => {
        const random = this.randomQuestion(data.result)
        this.question = random.question;
        this.correct_answer = random.correct_answer;
        let str = random.answers;
        this.answers = str.split('#');
        this.answer0 = this.answers[0]
        this.answer1 = this.answers[1]
        this.answer2 = this.answers[2]
        this.answer3 = this.answers[3]
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  randomQuestion(questions: any[]) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    return randomQuestion;
}
}
