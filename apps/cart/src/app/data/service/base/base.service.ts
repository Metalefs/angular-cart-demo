import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Inject } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { ErrorHandler } from '../../../core/error.handler';

@Injectable({
  providedIn: 'root'
})

export class BaseService<Type> {

  constructor(
    @Inject(String) protected domain_route: string,
    protected http: HttpClient,
    protected ErrorHandler: ErrorHandler,
  ) { }

  Ler<Type>(limit?: number, skip?: number): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(environment.endpoint + this.domain_route + '/acima').pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

}
