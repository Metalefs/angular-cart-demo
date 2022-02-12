import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

import { CardComponent } from './card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    CardComponent,
  ]
})
export class CardModule { }
