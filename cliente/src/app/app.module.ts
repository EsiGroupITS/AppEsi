import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// modulos propios
import { WelcomePageModule  } from './pages/welcome/welcome.module';
import { LoginPageModule    } from './pages/auth/login/login.module';
import { TokenInterceptor } from './interceptors/interceptor-token.service';
import { StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AccessibilityComponent } from './components/shared/accessibility/accessibility.component';
import { uiReducer } from './ui-state/reducers/ui.reducers';
import { userReducer } from './ui-state/reducers/user.reducer';


@NgModule({
  declarations: [AppComponent, AccessibilityComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({ui: uiReducer, user: userReducer}),
    WelcomePageModule,
    LoginPageModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
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
    },
    // provideStore({ui: uiReducer})
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
