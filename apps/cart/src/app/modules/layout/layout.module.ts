import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { HeaderModule } from './header/header.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { ContentLayoutModule } from './content-layout/content-layout.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderModule,
    FooterModule,
    NavbarModule,
    RouterModule.forChild([])
  ],
  exports:[
    ContentLayoutModule,
    FooterModule,
    HeaderModule,
    NavbarModule
  ]
})
export class LayoutModule { }
