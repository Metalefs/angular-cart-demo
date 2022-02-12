import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { entities } from '@codeby/data';
import { Gallery } from 'ng-gallery';
import { Observable } from 'rxjs';
import { fade, slideInOut } from '../../../animations';
import { AdicionarProdutoAoOrcamento, DuplicarProdutoOrcamento, EditarProdutoAbertoOrcamentoLocal} from '../../../data/store/actions/orcamento.actions';
import { sum } from '../../../helper/ObjHelper';
import { CheckoutDisplayComponent } from '../dialogs/checkout-display/checkout-display.component';
import { ProdutoStateService } from '../../../modules/checkout/produto-state.service';
import { OrcamentoState } from '../../../data/store/state';

@Component({
  selector: 'codeby-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.scss'],
  animations:[fade, slideInOut]
})
export class CardProdutoComponent implements OnInit {

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<entities.Orcamento>;
  constructor(private store: Store,private dialog:MatDialog, private gallery: Gallery, private router:Router, private service:ProdutoStateService) { }
  @Input() Produto:entities.Produto;


  ngOnInit(): void {
    this.AdicionarAoOrcamento = this.AdicionarAoOrcamento.bind(this);
  }

  encodeURI(value:string){
    return encodeURIComponent(value);
  }

  AdicionarAoOrcamento(produto?:entities.Produto){
    this.Orcamento$.subscribe(x=>{

      const produtoEstaNoOrcamento = x?.Produto?.filter(x=>x.Produto.Nome === this.Produto.Nome);

      if(produtoEstaNoOrcamento?.length === 0 || !produtoEstaNoOrcamento){

        this.store.dispatch(new AdicionarProdutoAoOrcamento(this.Produto));

      }
      else{
        this.Produto.Quantidade += produtoEstaNoOrcamento[0].Produto.Quantidade;

        this.store.dispatch(new DuplicarProdutoOrcamento(this.Produto));
      }
      this.openCheckout();

    });
  }

  meanRating(){
    if (!this.Produto.Rating)
    return 0;
    return  (sum(this.Produto.Rating) / this.Produto.Rating.length).toFixed(1)
  }

  openCheckout(){
    this.dialog.open(CheckoutDisplayComponent, {
      restoreFocus: false,
      width:'512px',
      height:'100vh',
      position:{
        right:'0'
      },
      panelClass:['no-padding']
    });
  }
}
