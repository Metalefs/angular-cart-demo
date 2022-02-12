import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProdutoService } from '../../data/service';
import { LerCategoria } from '../../data/store/actions/categoria.actions';
import { EditarFiltroProduto } from '../../data/store/actions/filtroproduto.actions';
import { CategoriaState, ProdutoState, FiltroProdutoState, OrcamentoState } from '../../data/store/state';
import { FiltroProdutoStateModel } from '../../data/store/state/filtroproduto.state';
import { order, orderPreco } from '../../helper/ObjHelper';
import { FiltroProduto } from '../../shared/models/interfaces/filtroProduto';

import { entities } from '@codeby/data';
import { interfaces } from '@codeby/data';

@Injectable({
  providedIn: 'root'
})
export class ProdutoStateService {

  defaultCategory = "Todos os produtos";
  CategoriaAtiva: entities.Categoria;
  CategoriasAtivas: entities.Categoria[] = [];

  @Select(CategoriaState.ObterListaCategorias) Categorias$: Observable<entities.Categoria[]>;
  @Select(CategoriaState.areCategoriasLoaded) areCategoriasLoaded$;
  areCategoriasLoadedSub: Subscription;

  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<entities.Produto[]>;
  Produtos: entities.Produto[];
  @Select(FiltroProdutoState.ObterListaFiltroProdutos) Filtro$: Observable<FiltroProdutoStateModel>;

  activeSearchFilter = "";
  activeOrderFilter: number = interfaces.TiposOrdenacao.nomeDesc;

  activeOrderLimit = 40;

  loading = false;
  loading_more = false;

  fQuery: interfaces.FiltrarProdutoSearchQuery = {
    Nome: "",
    NomeCategoria: "",
    Preco: "",
  }

  constructor(
    private dialog: NgDialogAnimationService,
    private store: Store,
    private produtoService: ProdutoService,
    private titleService: Title,
    private activeRoute: ActivatedRoute) {

  }

  Atualizar() {
    this.RecarregarCategorias();
  }

  public HandleFilterState() {
    this.Filtro$.subscribe(x => {
      this.titleService.setTitle(`Produtos - ${this.CategoriaAtiva.Nome}`);
    });
  }

  private OrdenarProdutos(x: entities.Produto[]) {
    switch (+this.activeOrderFilter) {
      case interfaces.TiposOrdenacao.nome:
        this.Produtos = this.Produtos.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case interfaces.TiposOrdenacao.nomeDesc:
        this.Produtos = this.Produtos.sort((a, b) => this.order(a, b, true));
        break;

      case interfaces.TiposOrdenacao.preco:
        this.Produtos = this.Produtos.sort((a, b) => this.orderPreco(a, b, false));
        break;

      case interfaces.TiposOrdenacao.precoDesc:
        this.Produtos = this.Produtos.sort((a, b) => this.orderPreco(a, b, true));
        break;
    }
  }

  matchSearchFilter(produto: entities.Produto) {
    if (this.activeSearchFilter)
      return this.activeSearchFilter.length > 0 ?
        produto.name.toLocaleLowerCase().includes(this.activeSearchFilter.toLocaleLowerCase())
        :
        true;

    return true;
  }

  order(a, b, desc) {
    return order(a, b, desc)
  }
  orderPreco(a, b, desc) {
    return orderPreco(a, b, desc)
  }

  redefinirBusca() {
    this.SetCategoria(null);
    this.activeSearchFilter = '';
    this.activeOrderFilter = 0;
  }

  JoinCategoriasAtivas() {
    return this.CategoriasAtivas?.map(x => x.Nome).join(', ');
  }

  SetCategoria(categoria: entities.Categoria) {
    if (categoria == null || categoria.Nome === this.defaultCategory) {
      this.CategoriaAtiva = new entities.Categoria(this.defaultCategory)
      this.CategoriasAtivas = [new entities.Categoria(this.defaultCategory)]
    }
    else {
      this.CategoriaAtiva = categoria;
      const idx = this.CategoriasAtivas.findIndex(x => x.Nome === categoria.Nome);
      const idx2 = this.CategoriasAtivas.findIndex(x => x.Nome === this.defaultCategory);
      if (idx !== -1) {
        this.CategoriasAtivas.splice(idx, 1);
      }
      else {
        this.CategoriasAtivas.push(categoria);
      }
      if (idx2 !== -1) {
        this.CategoriasAtivas.splice(idx2, 1);
      }
    }
    this.CategoriasAtivas = this.CategoriasAtivas.filter((value, index, self) => self.indexOf(value) === index)
    this.titleService.setTitle(`Produtos - ${this.CategoriaAtiva.Nome}`)
  }


  RecarregarCategorias() {
    this.areCategoriasLoadedSub = this.areCategoriasLoaded$.pipe(
      tap((areCategoriasLoaded) => {
        if (!areCategoriasLoaded)
          this.store.dispatch(new LerCategoria());
      })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ).subscribe(value => {

    });
  }

  Ceil(number) {
    return Math.ceil(number);
  }

  IsCategoriaAtiva(categoria: entities.Categoria) {
    if (categoria == null)
      return this.CategoriasAtivas.some(x => x.Nome === this.defaultCategory)
    return this.CategoriasAtivas.some(x => x.Nome === categoria.Nome)
  }

  delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(false);
      }, ms);
    });
  }
}
