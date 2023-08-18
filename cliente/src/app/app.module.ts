import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// modulos propios
import { WelcomePageModule  } from './pages/welcome/welcome.module';
import { LoginPageModule    } from './pages/auth/login/login.module';
import { AccesibilityModule } from './shared/modules/accesibility/accesibility.module';
import { AccessibilityComponent } from './components/shared/accessibility/accessibility.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    WelcomePageModule,
    LoginPageModule,
    //AccesibilityModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
