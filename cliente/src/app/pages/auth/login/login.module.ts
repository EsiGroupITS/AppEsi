import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AccessibilityComponent } from 'src/app/components/shared/accessibility/accessibility.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [LoginPage, AccessibilityComponent]
})
export class LoginPageModule {

  


  onClick(){}
}
