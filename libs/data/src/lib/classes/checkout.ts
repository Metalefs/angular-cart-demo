import { Produto } from './produto';
import { StatusOrcamento } from '../enums/StatusOrcamento';
import { entidadeBase } from '../interfaces/entity';
import { Orcamento, CodProduto } from './orcamento';

export class Checkout {
  value!: number;
  items!: Produto[];
  totalizers!: {
    id: string,
    name: string,
    value: number
  }[];
  itemMetadata!: {
    items: [
      {
        id: string,
        seller: string,
        name: string,
        skuName: string,
        productId: string,
        refId: any,
        ean: string,
        imageUrl: string,
        detailUrl: string,
        assemblyOptions: any
      }
    ]
  };
}

