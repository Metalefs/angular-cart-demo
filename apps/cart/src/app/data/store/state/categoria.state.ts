import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@codeby/data';

import { LerCategoria } from '../actions/categoria.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { order } from '../../../helper/ObjHelper';
import { AnyForUntypedForms } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';

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

  constructor(private CategoriaService:CategoriaService){

  }

  @Selector()
  static ObterListaCategorias(state: CategoriaStateModel) {
    return state.Categorias;
  }

  @Selector()
  static areCategoriasLoaded(state: CategoriaStateModel) {
      return state.areCategoriasLoaded;
  }

  @Action(LerCategoria)
  LerCategoria({getState, setState}: StateContext<CategoriaStateModel>){
      return this.CategoriaService.Ler().pipe(
        tap((result:AnyForUntypedForms) => {
          const state = getState();
          setState({
            ...state,
            Categorias: result.sort((a, b) => order(a,b,true)) as any,
            areCategoriasLoaded: true
          });
        }));
  }

}
