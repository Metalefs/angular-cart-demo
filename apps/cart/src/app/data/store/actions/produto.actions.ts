/* eslint-disable @typescript-eslint/no-empty-function */
import { entities } from '@codeby/data';

export class LerProduto {

  static readonly type = '[Produto] Read'

  constructor() {}
}

export class GostarProduto {

  static readonly type = '[Produto] Like'

  constructor(public id: string){}
}

export class RateProduto {

  static readonly type = '[Produto] Rate'

  constructor(public id: string, public rating:number){}
}

export class RemoverProduto {

  static readonly type = '[Produto] Remove'

  constructor(public id: string) {}
}
