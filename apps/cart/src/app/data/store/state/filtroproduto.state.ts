import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@codeby/data';

import { EditarFiltroProduto, AdicionarFiltroProduto, RemoverFiltroProduto, AdicionarListaProdutosFiltroProduto, EditarCategoriaFiltroProduto, EditarSearchFiltroProduto } from '../actions/filtroproduto.actions';

import { Injectable } from '@angular/core';

const defaultCategory = "Todos os produtos";
export class FiltroProdutoStateModel{
  FiltroProdutos!: entities.Produto[];
  areFiltroProdutosLoaded!: boolean;
}

@State<FiltroProdutoStateModel>({
  name:"FiltroProdutos",
  defaults: {
    FiltroProdutos:[],
    areFiltroProdutosLoaded: false
  }
})
@Injectable()
export class FiltroProdutoState {


  @Selector()
  static ObterListaFiltroProdutos(state: FiltroProdutoStateModel) {
      return state;
  }

  @Selector()
  static areFiltroProdutosLoaded(state: FiltroProdutoStateModel) {
      return state.areFiltroProdutosLoaded;
  }

  @Action(AdicionarFiltroProduto)
  AdicionarFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: AdicionarFiltroProduto) {
    const current = context.getState();

    context.patchState({
        FiltroProdutos : action.payload.Produtos
    });
  }

  @Action(EditarFiltroProduto)
  EditarFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: EditarFiltroProduto) {
    const current = context.getState();
    context.patchState({
      FiltroProdutos : action.payload.Produtos
    });
  }

  @Action(EditarCategoriaFiltroProduto)
  EditarCategoriaFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: EditarCategoriaFiltroProduto) {
    const current = context.getState();
    context.patchState({
        FiltroProdutos : current.FiltroProdutos
    });
  }

  @Action(EditarSearchFiltroProduto)
  EditarSearchFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: EditarSearchFiltroProduto) {
    const current = context.getState();

    context.patchState({
        FiltroProdutos : current.FiltroProdutos
    });
  }

  @Action(AdicionarListaProdutosFiltroProduto)
  AdicionarListaProdutosFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: AdicionarListaProdutosFiltroProduto) {
    const current = context.getState();

    context.patchState({
      FiltroProdutos : action.payload
    });
  }


}
