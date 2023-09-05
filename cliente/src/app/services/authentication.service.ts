import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Propiedad para almacenar el token
  token: string | undefined;

  // TODO: ALMACENAR baseUrl EN VARIABLES DE ENTORNO
  private baseUrl = "http://localhost:3000/"

  //# EXCELENTE
  private urlCreateUser = this.baseUrl+"auth/register"
  private urlLoginUser = this.baseUrl+"auth/login"

  constructor(private http: HttpClient, public router: Router, private cookies: CookieService) { }


  //Metodos para la autenticacion.
  //Crear un usuario requiere de los siguientes valores:
  //name: Referencia a nombre de el usuario, valor: string.
  //last_name: Referencia a apellido de el usuario, valor: string.
  //username: Referencia a el email de el usuario valor: string.
  //pass: Referencia a la password de el usuario, valor: string.
  public createUser( body: any) {
    return this.http.post(this.urlCreateUser, body);
  }
  //Para que un usuario se pueda logear, se necesitara:
  //username(email).
  //password.
  public loginUser( body: any) {
    return this.http.post(this.urlLoginUser, body);
  }

  // Método para verificar si el usuario ha iniciado sesión
  loggedIn() {
    return !!this.cookies.get('token');
  }

  // Método para obtener el token almacenado en la cookie
  getToken() {
    this.token = this.cookies.get('token'); // Asignar el valor del token
    return this.token;
  }

  // Método para cerrar sesión
  logout() {
    this.token = undefined; // Limpiar el token
    this.cookies.delete('token'); // Eliminar la cookie 'token'
    this.router.navigate(['/login']);
    window.location.reload(); // Recargar la página
  }

  // Método para decodificar un token JWT
  decodeToken(token: string): any {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }
}
