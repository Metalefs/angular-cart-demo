import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@codeby/data';
import { ProdutoService } from '../../service';

import { LerProduto, RemoverProduto, GostarProduto, RateProduto } from '../actions/produto.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private ProdutoService:ProdutoService, private dialog:MatDialog){

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

  @Action(GostarProduto)
  Gostar({getState,setState}: StateContext<ProdutoStateModel>, {id} : GostarProduto){
    return this.ProdutoService.Gostar(id).pipe(
      tap(result => {
        const state = getState();
        const ListaProdutos = [...state.Produtos];
        const index = ListaProdutos.findIndex(item => item._id === id);
        ListaProdutos[index].Likes = result.Likes;

        setState({
          ...state,
          Produtos: ListaProdutos,
        });
      })
    );
  }


  @Action(RateProduto)
  Rate({getState,setState}: StateContext<ProdutoStateModel>, {id,rating} : RateProduto){
    return this.ProdutoService.Rate(id,rating).pipe(
      tap(result => {
        const state = getState();
        const ListaProdutos = [...state.Produtos];
        const index = ListaProdutos.findIndex(item => item._id === id);
        ListaProdutos[index].Rating = result.Rating;

        setState({
          ...state,
          Produtos: ListaProdutos,
        });
      })
    );
  }

  @Action(RemoverProduto)
  async Remover({getState,setState}: StateContext<ProdutoStateModel>, {id} : RemoverProduto){
    return (await this.ProdutoService.Remover(id)).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.Produtos.filter(item => item._id !== id);
        setState({
          ...state,
          Produtos: filteredArray,
        });
      })
    );
  }

}
