/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AdicionarProdutoAoOrcamento, RemoverProdutoOrcamento, EditarOrcamentoLocal, EditarProdutoOrcamentoLocal, ResetarOrcamento, DuplicarProdutoOrcamento, EditarProdutoAbertoOrcamentoLocal, AplicarCodigoPromocional } from '../actions/orcamento.actions'
import { Injectable } from '@angular/core';

import { entities, enums } from '@codeby/data';
import { CalcularPrecoProduto } from '../../../helper/produto.helper';

export class OrcamentoStateModel {
  Orcamento!: entities.Orcamento;
  ListaPedidos: entities.Orcamento[] = [];
  areOrcamentosLoaded = false;
}

export const DEFAULT_ORCAMENTO = new entities.Orcamento([], enums.StatusOrcamento.aberto, 0);
@State<OrcamentoStateModel>({
  name: "Orcamentos",
  defaults: {
    Orcamento: DEFAULT_ORCAMENTO,
    ListaPedidos: [],
    areOrcamentosLoaded: false,
  }
})
@Injectable()
export class OrcamentoState {


  @Selector()
  static ObterOrcamentos(state: OrcamentoStateModel) {
    return state.Orcamento;
  }


  @Selector()
  static ObterListaOrcamentos(state: OrcamentoStateModel) {
    return state.ListaPedidos;
  }


  @Action(AdicionarProdutoAoOrcamento)
  AdicionarProdutoAoOrcamento({ getState, patchState }: StateContext<OrcamentoStateModel>, { payload }: AdicionarProdutoAoOrcamento) {
    const state = getState();
    const cod = new entities.CodProduto(payload, new Date().toISOString());
    state.Orcamento.Produto.push(cod);
    this.atualizarPreco(state);
    patchState({
      Orcamento: state.Orcamento
    });
    return cod;
  }

  @Action(DuplicarProdutoOrcamento)
  DuplicarProdutoOrcamento({ getState, patchState }: StateContext<OrcamentoStateModel>, { payload }: DuplicarProdutoOrcamento) {
    const state = getState();
    if (payload.Status == enums.StatusProduto.esgotado)
      return;
    const prod: entities.Produto = new entities.Produto(
      "",
      "",
      "",
      0,
      0,
    );
    const newprod = Object.assign(prod, payload);
    const cod = new entities.CodProduto(newprod, new Date().toISOString());
    state.Orcamento.Produto.push(cod);
    this.atualizarPreco(state);
    patchState({
      Orcamento: state.Orcamento
    });
  }

  @Action(RemoverProdutoOrcamento)
  RemoverProdutoOrcamento({ getState, patchState }: StateContext<OrcamentoStateModel>, { id, codOrcamento }: RemoverProdutoOrcamento) {
    const state = getState();
    state.Orcamento.Produto = state.Orcamento.Produto.filter(item => item.codOrcamento !== codOrcamento);

    this.atualizarPreco(state);
    patchState({
      Orcamento: state.Orcamento
    });
  }

  @Action(ResetarOrcamento)
  // eslint-disable-next-line no-empty-pattern
  ResetarOrcamento({ getState, patchState }: StateContext<OrcamentoStateModel>, { }: ResetarOrcamento) {
    const state = getState();
    state.Orcamento = DEFAULT_ORCAMENTO;
    this.atualizarPreco(state);
    patchState({
      Orcamento: state.Orcamento
    });
  }

  @Action(EditarOrcamentoLocal)
  EditarOrcamentoLocal({ getState, patchState }: StateContext<OrcamentoStateModel>, { payload }: EditarOrcamentoLocal) {
    const state = getState();
    this.atualizarPreco(state);
    patchState({
      ...state,
      Orcamento: payload,
    });
  }


  @Action(EditarProdutoOrcamentoLocal)
  EditarProdutoOrcamentoLocal({ getState, patchState }: StateContext<OrcamentoStateModel>, { payload, id, codOrcamento }: EditarProdutoOrcamentoLocal) {
    const state = getState();
    const ListaCodProdutos = [...state.Orcamento.Produto];
    const index = ListaCodProdutos.findIndex(item => item.codOrcamento === codOrcamento);
    ListaCodProdutos[index].Produto = payload;
    const orc = state.Orcamento;
    orc.Produto = ListaCodProdutos;
    this.atualizarPreco(state);
    patchState({
      ...state,
      Orcamento: orc,
    });
  }

  atualizarPreco(state: OrcamentoStateModel) {
    state.Orcamento.Preco = 0;
    state.Orcamento.Produto.forEach(prod => {
      if (!isNaN(prod!.Produto!.price)){
        const preco = CalcularPrecoProduto(prod!.Produto);
        state.Orcamento.Preco += preco;
      }
    })
  }
}
