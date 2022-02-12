import { Component, OnInit, Input } from '@angular/core';
import { entities, enums } from '@codeby/data';

@Component({
  selector: 'codeby-exibicao-preco-produto',
  templateUrl: './exibicao-preco-produto.component.html',
  styleUrls: ['./exibicao-preco-produto.component.scss']
})
export class ExibicaoPrecoProdutoComponent {
  @Input() Produto:entities.Produto;
  enumStatusProduto = enums.StatusProduto


}
