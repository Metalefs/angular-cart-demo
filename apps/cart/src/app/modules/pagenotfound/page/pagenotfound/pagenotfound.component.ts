import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WindowRef } from '../../../../shared/services/window.service';

@Component({
  selector: 'codeby-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent {
  constructor(private windowRef: WindowRef, @Inject(PLATFORM_ID) private platformId: any) { }

  back(){
    if(isPlatformBrowser(this.platformId)) {
      // Use the window reference: this.windowRef
      this.windowRef.nativeWindow.history.back();
    }
  }

}
