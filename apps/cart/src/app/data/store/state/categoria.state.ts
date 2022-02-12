import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@codeby/data';

import { Injectable } from '@angular/core';
export class CategoriaStateModel{
  Categorias: entities.Categoria[];
  areCategoriasLoaded: boolean;

}

@State<CategoriaStateModel>({
  name:"Categorias",
  defaults: {
    Categorias:[],
    areCategoriasLoaded: false
  }
})
@Injectable()
export class CategoriaState {

  @Selector()
  static ObterListaCategorias(state: CategoriaStateModel) {
    return state.Categorias;
  }

  @Selector()
  static areCategoriasLoaded(state: CategoriaStateModel) {
      return state.areCategoriasLoaded;
  }

}
