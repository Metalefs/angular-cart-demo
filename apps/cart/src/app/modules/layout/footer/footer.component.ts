import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../core/layout.service';

@Component({
  selector: 'codeby-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerContainerCssClasses = '';
  currentDateStr: string = new Date().getFullYear().toString();
  Copyright = 'Codeby'
  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.footerContainerCssClasses =
      this.layout.getStringCSSClasses('footerContainer');
  }
}
