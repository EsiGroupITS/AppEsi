import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// modulos propios
import { WelcomePageModule  } from './pages/welcome/welcome.module';
import { LoginPageModule    } from './pages/auth/login/login.module';
import { AccesibilityModule } from './shared/modules/accesibility/accesibility.module';
import { AccessibilityComponent } from './components/shared/accessibility/accessibility.component';
import { TokenInterceptor } from './interceptors/interceptor-token.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    WelcomePageModule,
    LoginPageModule,
    HttpClientModule
    //AccesibilityModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},
    {
      // Definición del tipo de token para proporcionar interceptores HTTP
      provide: HTTP_INTERCEPTORS,
    
      // Especifica la clase que se utilizará como interceptor para las solicitudes HTTP
      useClass: TokenInterceptor,
    
      // Permite que se puedan usar múltiples instancias de interceptores
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
