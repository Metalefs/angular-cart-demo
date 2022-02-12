/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { fade, slideInOut } from '../../../../animations';
import { ResetarOrcamento, EditarProdutoOrcamentoLocal, RemoverProdutoOrcamento } from '../../../../data/store/actions/orcamento.actions';
import { OrcamentoState } from '../../../../data/store/state';
import { CheckoutService } from '../../../../modules/checkout/checkout.service';

import { Observable } from 'rxjs';
import { entities,MaterialTable,enums } from '@codeby/data';

@Component({
  selector: 'codeby-checkout-display',
  templateUrl: './checkout-display.component.html',
  styleUrls: ['./checkout-display.component.scss'],
  animations:[fade,slideInOut]
})
export class CheckoutDisplayComponent implements OnInit {

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<entities.Orcamento> | undefined;
  ProdutoTable!:MaterialTable;
  ErroCadastro = false;
  Total = 0;
  constructor(private store:Store,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<CheckoutDisplayComponent>,
    private checkoutService: CheckoutService
    ) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{
      this.ProdutoTable = new MaterialTable();
      const Produtos =  x.Produto;
      this.ProdutoTable.dataSource = Produtos;
      this.ProdutoTable.displayedColumns = [
        "Produtos",
        "Quantidade",
        "Subtotal",
      ];

    })
  }

  close(){
    this.dialogRef.close();
  }

  delayClose(off:number = 0){
    setTimeout(()=>{
      this.close()
    },off);
  }

  IncrementarQuantidade(element: entities.CodProduto){
    element!.Produto!.Quantidade++;
    this.EditarOrcamento(element);
  }

  DecrescerQuantidade(element: entities.CodProduto){
    if(element!.Produto!.Quantidade > element!.Produto!.QuantidadeMinima || element!.Produto!.Quantidade > 1)
    element!.Produto!.Quantidade--;
    this.EditarOrcamento(element);
  }

  EditarOrcamento(element:entities.CodProduto){
    this.store.dispatch(new EditarProdutoOrcamentoLocal(element.Produto,element.Produto.id,element.codOrcamento));
    this.Orcamento$.subscribe(x=>{
      this.checkoutService.Validate(x);
    });
  }

  VerificarQuantidade($event: { target: { value: number; }; },element: entities.CodProduto){
    if($event.target.value <= 0)
      element!.Produto!.Quantidade = element.Produto.QuantidadeMinima == 0 ? 1 : element.Produto.QuantidadeMinima;

    this.EditarOrcamento(element);
  }

  removerProduto(Produto:entities.CodProduto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto.Produto.id,Produto.codOrcamento)).subscribe(x=>{
      this.Orcamento$.subscribe(x=>{
        const Produtos =  x.Produto;
        this.ProdutoTable.dataSource = Produtos;
      })
    });
  }

  CalcularPreco(produto:entities.CodProduto){
    this.Orcamento$.subscribe(x=>{
      const Produtos =  x.Produto;
      const index = x.Produto.findIndex(item => item.codOrcamento === produto.codOrcamento);
      const Produto = Produtos[index].Produto;
      this.Total =  produto.Produto.Status == enums.StatusProduto.promocao? (produto.Produto.price/10) + produto.Produto.priceTags.rawValue : produto.Produto.price * Produto.Quantidade;
    })
    if(produto.Produto.price){
      const preco =  produto.Produto.Status == enums.StatusProduto.promocao? (produto.Produto.price/10) + produto.Produto.priceTags.rawValue : produto.Produto.price;
      return parseInt(preco.toString()) * parseInt(produto?.Produto?.Quantidade?.toString() ?? "0");
    }
    return 0;
  }


}
