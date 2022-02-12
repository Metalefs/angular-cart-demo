import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler } from '../../core/error.handler';

import { BaseService } from './base/base.service';

import { entities } from '@codeby/data';
import { routes } from '@codeby/data';
import { environment } from '../../../environments/environment';
import { catchError, Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CheckoutService extends BaseService<entities.Checkout> {
  constructor(protected HttpClient:HttpClient, protected override ErrorHandler:ErrorHandler) {
    super(routes.RouteDictionary.Produtos.Raiz,HttpClient,ErrorHandler)
  }
  LerProdutoAbaixo10Reais<Type>(limit?: number, skip?: number): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(environment.endpoint + this.domain_route + '/abaixo').pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  LerProdutoAcima10Reais<Type>(limit?: number, skip?: number): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(environment.endpoint + this.domain_route + '/acima').pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
}
