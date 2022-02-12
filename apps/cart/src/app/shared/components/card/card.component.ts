import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'codeby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() customClass:string;


}
