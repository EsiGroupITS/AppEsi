import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

    // TODO: ALMACENAR baseUrl EN VARIABLES DE ENTORNO
    private baseUrl = "http://localhost:3040/"

    //# EXCELENTE
    private urlGetQuestions = this.baseUrl+"questions/category"

  constructor(private http: HttpClient) { }

  getQuestions(mensaje: string) {
    const urlWithParams = `${this.baseUrl}questions/category/${mensaje}`; // Concatenar el parámetro en la URL

    return this.http.get(urlWithParams);
  }


}
