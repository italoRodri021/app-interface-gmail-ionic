import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwipeItemComponent } from './swipe-item/swipe-item.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    SwipeItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    SwipeItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedComponentsModule { }
