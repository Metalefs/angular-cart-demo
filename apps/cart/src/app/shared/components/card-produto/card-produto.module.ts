import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CardProdutoComponent } from './card-produto.component';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { StarRatingModule } from 'angular-star-rating';
import { GalleryModule } from 'ng-gallery';


import { ExibicaoPrecoProdutoModule } from '../exibicao-preco-produto/exibicao-preco-produto.module';
import { CardProdutoBtnAdicionarCarrinhoComponent } from './card-produto-btn-adicionar-carrinho/card-produto-btn-adicionar-carrinho.component';
import { CardModule } from '../card/card.module';

@NgModule({
  declarations: [CardProdutoComponent, CardProdutoBtnAdicionarCarrinhoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    StarRatingModule.forRoot(),
    GalleryModule,
    ExibicaoPrecoProdutoModule,
    CardModule
  ],
  exports: [
    CardProdutoComponent,
    CardModule
  ]
})
export class CardProdutoModule { }
