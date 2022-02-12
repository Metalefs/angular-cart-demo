import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from './modules/layout/layout.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/checkout',
    pathMatch: 'full'
  },
  {
    path: 'pagenotfound',
    loadChildren: () => import('./modules/pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  { path: '**', redirectTo: 'pagenotfound' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  }),
    LayoutModule,
  ],
  exports: [
    RouterModule,
    LayoutModule,
  ],

})
export class AppRoutingModule { }
