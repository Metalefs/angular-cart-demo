import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Observable } from 'rxjs';
import { slideInOut,fade } from '../../../animations';
import { ResetarOrcamento, EditarProdutoOrcamentoLocal, RemoverProdutoOrcamento } from '../../../data/store/actions/orcamento.actions';
import { OrcamentoState } from '../../../data/store/state';
import { CheckoutService } from '../../../modules/checkout/checkout.service';

import { entities,MaterialTable,enums } from '@codeby/data';

@Component({
  selector: 'codeby-tabela-edicao-orcamento',
  templateUrl: './tabela-edicao-orcamento.component.html',
  styleUrls: ['./tabela-edicao-orcamento.component.scss'],
  animations:[fade,slideInOut]
})
export class TabelaEdicaoOrcamentoComponent {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<entities.Orcamento>;
  ProdutoTable:MaterialTable;
  dataSource: MatTableDataSource<entities.CodProduto>;

  Total = 0;
  @Input() edit = true;
  constructor(
    public checkoutService: CheckoutService,
    private store:Store,
    private snack: MatSnackBar,
    public dialog: NgDialogAnimationService,
    ) { }
    ngOnInit(): void {
      this.Orcamento$.subscribe(x=>{
        console.log(x)
        this.ProdutoTable = new MaterialTable();
        this.dataSource = new MatTableDataSource<entities.CodProduto>(x.Produto);

        this.ProdutoTable.displayedColumns = [
          "Produtos",
          "Quantidade",
          "Subtotal",
        ];

        if(x.Status == enums.StatusOrcamento.enviado){
          this.snack.open("Pedido já foi enviado.", "Fechar",{duration:5000}).afterOpened().subscribe(x=>{
            this.store.dispatch(new ResetarOrcamento());
          });
        }
      })
    }
  IncrementarQuantidade(element: entities.CodProduto){
    if(element){
      element.Produto.Quantidade++;
      this.EditarOrcamento(element);
    }
  }
  DecrescerQuantidade(element: entities.CodProduto){
    if(element){
      if(element.Produto.Quantidade > 0)
      element.Produto.Quantidade--;
      this.EditarOrcamento(element);
    }
  }

  EditarOrcamento(element:entities.CodProduto){
    this.store.dispatch(new EditarProdutoOrcamentoLocal(element.Produto,element.Produto.id,element.codOrcamento)).subscribe(store =>{
      this.Orcamento$.subscribe((orc: entities.Orcamento)=>{
        this.checkoutService.Validate(orc);
      })
    });
  }

  removerProduto(Produto:entities.CodProduto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto.Produto.id,Produto.codOrcamento)).subscribe(x=>{
      this.Orcamento$.subscribe((x: entities.Orcamento)=>{
        const Produtos =  x.Produto;
        //let DistinctProdutos = removeDuplicates(Produtos,"_id");
        this.checkoutService.Validate(x);
        this.dataSource = Produtos as any;
      })
    });
  }

  CalcularPreco(produto:entities.CodProduto){
    this.Orcamento$.subscribe((x: { Produto: any[]; })=>{
      if(produto.Produto){
        let preco;
        let Produto;
        if(produto.Produto.price){
          preco =  produto.Produto.Status == enums.StatusProduto.promocao? (produto.Produto.price/10) + produto.Produto.priceTags.rawValue : produto.Produto.price;
        }
        const Produtos =  x.Produto;
        const index = x.Produto.findIndex((item: { codOrcamento: any; }) => item.codOrcamento === produto.codOrcamento);
        if(Produtos[index])
        Produto = Produtos[index].Produto;
        if(Produto)
        this.Total = preco * Produto.Quantidade;
      }
    })
    if(produto.Produto.price){
      const preco = produto.Produto.Status == enums.StatusProduto.promocao? (produto.Produto.price/10) + produto.Produto.priceTags.rawValue : produto.Produto.price;

      return (preco * produto.Produto.Quantidade).toFixed(2);
    }
    // eslint-disable-next-line no-self-assign
    this.dataSource.data = this.dataSource.data;
    return 0;
  }
}
