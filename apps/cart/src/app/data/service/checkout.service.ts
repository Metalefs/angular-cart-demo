import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler } from '../../core/error.handler';

import { BaseService } from './base/base.service';

import { entities } from '@codeby/data';
import { routes } from '@codeby/data';
@Injectable({
  providedIn: 'root'
})

export class CheckoutService extends BaseService<entities.Checkout> {
  constructor(protected HttpClient:HttpClient, protected override ErrorHandler:ErrorHandler) {
    super(routes.RouteDictionary.Produtos.Raiz,HttpClient,ErrorHandler)
  }

}
