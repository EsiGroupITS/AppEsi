import { CUSTOM_ELEMENTS_SCHEMA, NgModule               } from '@angular/core';
import { CommonModule           } from '@angular/common';
import { AccessibilityService   } from 'src/app/services/accessibility.service';
import { AccessibilityComponent } from 'src/app/components/shared/accessibility/accessibility.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AccessibilityService],
})
export class AccesibilityModule { }
