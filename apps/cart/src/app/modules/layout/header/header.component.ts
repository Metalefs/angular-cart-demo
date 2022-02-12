import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CheckoutDisplayComponent } from '../../../shared/components/dialogs/checkout-display/checkout-display.component';
import { fade, slideInOut } from '../../../animations';
import { NgDialogAnimationService } from "ng-dialog-animation";


@Component({
  selector: 'codeby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fade,slideInOut]
})
export class HeaderComponent {
  defaultCategory = "Todos os produtos";
  constructor(
    private router: Router,
    private store: Store,
    public dialog: NgDialogAnimationService,
    ) {

  }

  openCheckout(){
    this.dialog.open(CheckoutDisplayComponent, {
      restoreFocus: false,
      width:'512px',
      animation: {
        to: "left",
        incomingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        },
        outgoingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        }
      },
      position: { rowStart: "0" },
      height:'100vh',

      panelClass:['no-padding','cart_slide','animate__animated','animate__slideInRight'],
    });
  }

}
