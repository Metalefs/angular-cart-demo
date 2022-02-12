import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import { StarRatingModule } from 'angular-star-rating';

import { CardProdutoModule } from './components/card-produto/card-produto.module';
import { ScrolltopModule } from './components/scrolltop/scrolltop.module';

import { CheckoutDisplayComponent } from './components/dialogs/checkout-display/checkout-display.component';

import { ExibicaoPrecoProdutoModule } from './components/exibicao-preco-produto/exibicao-preco-produto.module';

import { TabelaEdicaoOrcamentoComponent } from './components/tabela-edicao-orcamento/tabela-edicao-orcamento.component';

import { CardModule } from './components/card/card.module';

@NgModule({
  declarations: [
    CheckoutDisplayComponent,
    TabelaEdicaoOrcamentoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CardProdutoModule,
    RouterModule,
    ScrolltopModule,
    GalleryModule,
    LightboxModule.withConfig({
      panelClass: 'fullscreen'
    }),
    ExibicaoPrecoProdutoModule,
    StarRatingModule,
    CardModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CardProdutoModule,
    RouterModule,
    ScrolltopModule,
    ExibicaoPrecoProdutoModule,
    TabelaEdicaoOrcamentoComponent,
    StarRatingModule,
    CardModule
  ],
})
export class SharedModule { }
