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
  // Declarar variables para la pregunta y respuestas
  question: any;
  answer0: any;
  answer1: any;
  answer2: any;
  answer3: any;
  answers: any;
  correct_answer: any;
  selectedAnswer?: string; // Variable para almacenar la respuesta seleccionada
  answered = false; // Variable para verificar si el usuario ya respondió

  // Constructor para inyectar servicios
  constructor(private gs: GeneralServiceService, private route: ActivatedRoute, private alertController: AlertController, private router: Router) { }

  // Gancho de ciclo de vida OnInit
  ngOnInit() {
    // Suscribirse a los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      // Obtener el parámetro 'mensaje' de la ruta
      const mensaje = params.get('mensaje');
      if (mensaje) {
        // Verificar el valor del parámetro 'mensaje'
        if (mensaje === "ENFERMEDADES") {
          // Si 'mensaje' es "ENFERMEDADES", establecer 'mensaje' en 'ets'
          const mensaje = 'ets'
          this.getQuestions(mensaje)
        }
        else {
          // De lo contrario, llamar a getQuestions con el parámetro 'mensaje'
          this.getQuestions(mensaje);
        }
      }
    });
  }

  // Método para verificar la respuesta seleccionada
  async checkAnswer(selectedAnswer: string) {
    // Solo permitir seleccionar una respuesta si no se ha respondido aún
    if (!this.answered) {
      this.selectedAnswer = selectedAnswer; // Almacenar la respuesta seleccionada
      this.answered = true; // Marcar la pregunta como respondida
      if (selectedAnswer === this.correct_answer) {
        // Si la respuesta es correcta, mostrar una alerta de éxito
        let img = '.../../../../../../../assets/img/emoji_questions_correct.png';

        // ALERTA DE ÉXITO
        const alert = await this.alertController.create({
          message: new IonicSafeString(`<img src="${img}" alt="photo"  /> Nos pone muy contento que estés tan informado!`),
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
        setTimeout(() => alert.present(), 2000);
      } else {
        // Si la respuesta es incorrecta, mostrar una alerta de error
        let img = '.../../../../../../../assets/img/emoji_questions_incorrect.png';

        // ALERTA DE ERROR
        const alert = await this.alertController.create({
          message: new IonicSafeString(`<img src="${img}" alt="photo"  /> No pierdas el interés, hay que probar para aprender!`),
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
        setTimeout(() => alert.present(), 2000);
      }
    }
  }

  // Método para obtener preguntas según el parámetro 'mensaje'
  getQuestions(mensaje: string) {
    // Llamar a GeneralServiceService para obtener preguntas
    this.gs.getQuestions(mensaje).subscribe({
      next: (data: any) => {
        // Seleccionar una pregunta aleatoria de los datos
        const random = this.randomQuestion(data.result)
        this.question = random.question;
        this.correct_answer = random.correct_answer;
        let str = random.answers;
        // Separar las respuestas, ya que vienen todas unidas con un #
        this.answers = str.split('#');
        // Establecer las respuestas para mostrar en el HTML
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

  // Función para obtener una pregunta aleatoria del array de preguntas
  randomQuestion(questions: any[]) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    return randomQuestion;
  }
}
