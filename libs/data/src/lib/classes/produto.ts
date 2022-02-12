import { StatusProduto } from '../enums/StatusProduto';
import { entidadeBase } from '../interfaces/entity';

export class Produto implements entidadeBase {
  id!: string;
  name: string;
  Subtitulo: string;
  NomeCategoria: string;
  Quantidade?: number = 1;
  QuantidadeMinima?: number = 0;
  Status?: StatusProduto = StatusProduto.promocao;
  PrecoPromocional?: number;
  Parcelas?: number;
  Codigo?: string;
  seller?: string;
  skuName?: string;
  productId?: string;
  refId: any;
  ean?: string;
  imageUrl?: string;
  detailUrl?: string;
  assemblyOptions: [] = [];
  priceValidUntil!: string;
  tax!: number;
  price!: number;
  listPrice!: number;
  manualPrice!: null;
  sellingPrice!: number;
  rewardValue!: number;
  isGift!: boolean;
  additionalInfo!: {
    brandName: string;
    brandId: string;
    offeringInfo: any;
    offeringType: any;
    offeringTypeId: any;
  };
  preSaleDate: any;
  productCategoryIds!: string;
  productCategories!: any;
  quantity!: number;
  sellerChain!: [string];
  components!: [];
  bundleItems!: [];
  attachments!: [];
  attachmentOfferings!: [];
  offerings!: [];
  priceTags!: {

    name: string;
    value: number;
    rawValue: number;
    isPercentual: false;
    identifier: string;

  };
  availability!: string;
  measurementUnit!: string;
  unitMultiplier!: number;
  manufacturerCode: any;
  constructor(
    Nome: string,
    Subtitulo: string,
    NomeCategoria: string,
    QuantidadeMinima?: number,
    Status?: StatusProduto,
    PrecoPromocional?: number,
  ) {
    this.name = Nome;
    this.Subtitulo = Subtitulo;
    this.NomeCategoria = NomeCategoria;
    this.QuantidadeMinima = QuantidadeMinima;
    this.Status = Status;
    this.PrecoPromocional = PrecoPromocional;
  }
  DataHoraCriacao!: Date;
  DataHoraAlteracao!: Date;
  DataHoraExclusao!: Date;

};
