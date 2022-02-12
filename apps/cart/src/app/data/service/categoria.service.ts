import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ErrorHandler } from '../../core/error.handler';
import { BaseService } from './base/base.service';
import { entities } from '@codeby/data';
import { routes } from '@codeby/data';

@Injectable({
    providedIn: 'root'
})

export class CategoriaService extends BaseService<entities.Categoria> {

  constructor(protected HttpClient:HttpClient, protected override ErrorHandler:ErrorHandler) {
    super(routes.RouteDictionary.Categoria, HttpClient,ErrorHandler)
   }

}
