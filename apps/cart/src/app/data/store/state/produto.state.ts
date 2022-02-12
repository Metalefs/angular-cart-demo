import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@codeby/data';

import { LerProduto } from '../actions/produto.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutService } from '../../service/checkout.service';

export class ProdutoStateModel{
  Produtos: entities.Produto[] = [];
  areProdutosLoaded = false;
}

@State<ProdutoStateModel>({
  name:"Produtos",
  defaults: {
    Produtos:[],
    areProdutosLoaded: false,
  }
})
@Injectable()
export class ProdutoState {

  constructor(private ProdutoService:CheckoutService, private dialog:MatDialog){

  }

  @Selector()
  static ObterListaProdutos(state: ProdutoStateModel) {
      return state.Produtos;
  }

  @Selector()
  static areProdutosLoaded(state: ProdutoStateModel) {
      return state.areProdutosLoaded;
  }

  @Action(LerProduto)
  LerProduto({getState, setState}: StateContext<ProdutoStateModel>){
      return this.ProdutoService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Produtos: (result as any).items,
            areProdutosLoaded: true
          });
        }));
  }

}
