import { Component, Input, OnInit } from '@angular/core';
import { entities } from '@codeby/data';

@Component({
  selector: 'codeby-card-produto-btn-adicionar-carrinho',
  templateUrl: './card-produto-btn-adicionar-carrinho.component.html',
  styleUrls: ['./card-produto-btn-adicionar-carrinho.component.scss']
})
export class CardProdutoBtnAdicionarCarrinhoComponent {

  @Input() AdicionarAoOrcamento: (produto?: entities.Produto) => void;


}
