import { Component, Input, OnInit } from '@angular/core';

import { SideNavState } from '../content-layout/page/content-layout.component';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'codeby-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input()NavState!:SideNavState;

  collapsed = true;

  constructor(
    public dialog: MatDialog) { }

  ToggleNav(delay: number) {
    setTimeout(() => {
      this.NavState.open = this.NavState.open ? false : true;
    }, delay);
  }
}
