import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { isEmpty } from '../../helper/ObjHelper';
import { ErrorHandler } from '../../core/error.handler';

import { BaseService } from './base/base.service';

import { entities } from '@codeby/data';
import { interfaces } from '@codeby/data';
import { routes } from '@codeby/data';
@Injectable({
  providedIn: 'root'
})

export class ProdutoService extends BaseService<entities.Produto> {
  constructor(protected HttpClient:HttpClient, protected override ErrorHandler:ErrorHandler) {
    super(routes.RouteDictionary.Pedidos.Raiz,HttpClient,ErrorHandler)
  }

  FiltrarProdutos(fields: interfaces.FiltrarProdutoSearchQuery, page: number = 1, limit: number = 12): Observable<entities.Produto[]> {
    let query = '?nome=' + fields.Nome ?? "";
    query += '&categoria=' + fields.NomeCategoria ?? "";
    query += '&preco=' + fields.Preco ?? "";
    query += '&limit=' + limit;

    return this.http.get<entities.Produto[]>(environment.endpoint + routes.RouteDictionary.Produtos.Filtrar + `${page}/` + query).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  Gostar(id: string): Observable<entities.Produto> {
    return this.http.post<entities.Produto>(environment.endpoint + routes.RouteDictionary.Produtos.Gostar, { id: id }).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  IncrementarVenda(id: string): Observable<entities.Produto> {
    return this.http.post<entities.Produto>(environment.endpoint + routes.RouteDictionary.Produtos.IncrementarVendas, { id: id }).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  IncrementarVisualizacoes(id: string): Observable<entities.Produto> {
    return this.http.post<entities.Produto>(environment.endpoint + routes.RouteDictionary.Produtos.IncrementarVisualizacoes, { id: id }).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  Rate(id: string, rating: number): Observable<entities.Produto> {
    return this.http.post<entities.Produto>(environment.endpoint + routes.RouteDictionary.Produtos.Rate, { id: id, rating: rating }).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

}
