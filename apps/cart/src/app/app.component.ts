import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngxs/store';
import AOS from 'aos';

import { AdicionarProdutoAoOrcamento, ResetarOrcamento } from './data/store/actions/orcamento.actions';
import { LerProdutoAbaixo10Reais, LerProdutoAcima10Reais } from './data/store/actions/produto.actions';
import { CookieLawComponent } from 'angular2-cookie-law';
import { enums } from '@codeby/data';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snack: MatSnackBar,
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
    this.loadAmountOver = this.loadAmountOver.bind(this);
    this.loadAmountBelow = this.loadAmountBelow.bind(this);
  }

  ngAfterViewInit(){
    this.cookieLawEl?.isSeen.subscribe(x=>this.dismissed = x);
  }

  loadAmountOver(){
    this.store.dispatch(new LerProdutoAcima10Reais()).subscribe((result) => {
      this.loadingInfo = 'Obtendo produtos'
      this.store.dispatch(new ResetarOrcamento()).subscribe((result) => {console.log('carrinho esvaziado')});
      result.Produtos.Produtos.forEach(element => {
        element.Quantidade = 1;
        element.Status = enums.StatusProduto.promocao;
        this.store.dispatch(new AdicionarProdutoAoOrcamento(element)).subscribe((result) => {
          console.log(element.name + " Adicionado ao carrinho")
        });

      });
      this.snack.open("Remova os itens abaixo de R$ 10,00 para continuar", "Atenção")
    } );
  }

  loadAmountBelow(){
    this.store.dispatch(new LerProdutoAbaixo10Reais()).subscribe((result) => {
      this.loadingInfo = 'Obtendo produtos'
      this.store.dispatch(new ResetarOrcamento()).subscribe((result) => {console.log('carrinho esvaziado')});
      result.Produtos.Produtos.forEach(element => {
        element.Quantidade = 1;
        element.Status = enums.StatusProduto.promocao;
        this.store.dispatch(new AdicionarProdutoAoOrcamento(element)).subscribe((result) => {
          console.log(element.name + " Adicionado ao carrinho")
        });
      });
      this.snack.open("Remova os itens acima de R$ 10,00 para continuar", "Atenção")
    } );
  }

  hideSpiner(){
    this.spinner.hide();
  }

  ngOnInit() {
    AOS.init();
    if (isPlatformBrowser(this.platform)) {
      this.spinner.show();
      this.loadAmountBelow();
    }
  }

  dismissCookieLaw() {
    this.cookieLawEl.dismiss();
  }

}
