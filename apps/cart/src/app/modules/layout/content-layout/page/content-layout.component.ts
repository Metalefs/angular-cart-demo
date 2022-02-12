import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { cardFlip, fade, slideInOut, slider } from '../../../../animations';

@Component({
  selector: 'codeby-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [cardFlip, slider, fade, slideInOut]
})
export class ContentLayoutComponent implements OnInit {
  constructor(private router:Router) { }
  NavState:SideNavState = {open : false};
  url!:string;
  @Input()loadAmountOver: () => any;
  @Input()loadAmountBelow: () => any;

  ngOnInit(): void {
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationStart) {
        this.url = event.url;
      }
      if(event instanceof NavigationEnd) {
        this.url = event.url;
      }
    })
  }

  ToggleNav(delay:number){
    setTimeout(()=>{
      this.NavState.open = this.NavState.open ? false : true;
    },delay);
  }
  CloseNav(){
    if(this.NavState.open)
    this.NavState.open = false;
  }
  showHeader(){
    return true;//!this.url?.includes('checkout')
  }
  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){
      console.error(ex)
    }
  }

}
export interface SideNavState{
  open:boolean
}
