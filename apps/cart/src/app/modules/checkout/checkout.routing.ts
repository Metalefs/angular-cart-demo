import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './page/checkout/checkout.component';
export const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    data: { animation:'checkout' },
    children: [


    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPageRoutes {}
