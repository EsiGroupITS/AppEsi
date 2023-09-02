import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    // Inyecta el servicio de autenticación para acceder al token de autenticación
    private restService: AuthenticationService
  ) {}

  // Método intercept que agrega el token de autenticación a las cabeceras de la solicitud
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clona la solicitud actual y agrega el encabezado de Autorización con el token de autenticación
    const requestWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.restService.getToken()}`
      }
    });
    
    // Continúa con el proceso de manejo de la solicitud, utilizando la solicitud modificada
    return next.handle(requestWithToken);
  }
}

