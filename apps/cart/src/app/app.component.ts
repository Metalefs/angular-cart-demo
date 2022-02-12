import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngxs/store';
import AOS from 'aos';

import { LerCategoria } from './data/store/actions/categoria.actions';
import { LerOrcamento } from './data/store/actions/orcamento.actions';
import { LerProduto } from './data/store/actions/produto.actions';
import { CookieLawComponent } from 'angular2-cookie-law';

@Component({
  selector: 'codeby-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cart';
  dismissed:boolean;
  @ViewChild('cookieLaw')
  cookieLawEl: CookieLawComponent;
  loadingInfo = '';
  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platform: Object,
    private titleService: Title
  ) {
    const appTitle = this.titleService.getTitle();
    if (isPlatformBrowser(this.platform)) {

      this.router
        .events.pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => {
            let child = this.activatedRoute.firstChild;
            while (child.firstChild) {
              child = child.firstChild;
            }
            if (child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            }
            return appTitle;
          })
        ).subscribe((ttl: string) => {
          this.titleService.setTitle(ttl);
        });
    }
  }
  ngAfterViewInit(){
    this.cookieLawEl?.isSeen.subscribe(x=>this.dismissed = x);
  }

  LerServicosAPI() {
    this.store.dispatch(new LerProduto()).subscribe(() => this.loadingInfo = 'Obtendo produtos');
    this.store.dispatch(new LerOrcamento()).subscribe(() => this.loadingInfo = '');

    this.store.dispatch(new LerCategoria()).subscribe();
  }

  hideSpiner(){
    this.spinner.hide();
  }

  ngOnInit() {
    AOS.init();
    if (isPlatformBrowser(this.platform)) {
      this.spinner.show();
      this.LerServicosAPI();
    }
  }

  dismissCookieLaw() {
    this.cookieLawEl.dismiss();
  }

}
