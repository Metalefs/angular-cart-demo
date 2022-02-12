import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@codeby/data';

import { LerProdutoAbaixo10Reais, LerProdutoAcima10Reais } from '../actions/produto.actions'
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

  @Action(LerProdutoAbaixo10Reais)
  LerProdutoAbaixo10Reais({getState, setState}: StateContext<ProdutoStateModel>){
      return this.ProdutoService.LerProdutoAbaixo10Reais().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Produtos: (result as any).items,
            areProdutosLoaded: true
          });
        }));
  }

  @Action(LerProdutoAcima10Reais)
  LerProdutoAcima10Reais({getState, setState}: StateContext<ProdutoStateModel>){
    return this.ProdutoService.LerProdutoAcima10Reais().pipe(
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
