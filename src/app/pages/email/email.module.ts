import { SharedDirectivesModule } from './../../directives/shared-directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailPageRoutingModule } from './email-routing.module';

import { EmailPage } from './email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [EmailPage]
})
export class EmailPageModule {}
