/* eslint-disable no-var */
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  Inject,
  HostListener,
  PLATFORM_ID,
} from '@angular/core';
import { WindowRef } from '../../services/window.service';


@Component({
  selector: 'codeby-scroll-top',
  templateUrl: './scrolltop.component.html',
  styleUrls: ['./scrolltop.component.scss'],
})
export class ScrolltopComponent {
  windowScrolled!: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(@Inject(PLATFORM_ID) private platform: Object,private windowRef: WindowRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.windowRef.nativeWindow.pageYOffset >= 600) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && this.windowRef.nativeWindow.pageYOffset <= 600) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    if (isPlatformBrowser(this.platform))
      (function smoothscroll(this: any) {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          self.windowRef.nativeWindow.requestAnimationFrame(smoothscroll);
          self.windowRef.nativeWindow.scrollTo(0, currentScroll - currentScroll / 8);
        }
      })();
  }
}
