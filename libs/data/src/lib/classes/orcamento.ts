import { StatusOrcamento } from '../enums/StatusOrcamento';
import { entidadeBase } from '../interfaces/entity';
import { Produto } from '.';
export class Orcamento implements entidadeBase{

    Produto:CodProduto[];
    Status:StatusOrcamento;
    Preco:number;

    constructor(
      Produto:CodProduto[],
      Status:StatusOrcamento,
      Preco:number,
    ){
        this.Produto = Produto;
        this.Status = Status;
        this.Preco = Preco;
    }

    DataHoraCriacao!: Date;
    DataHoraAlteracao!: Date;
    DataHoraExclusao!: Date;
}

export class CodProduto {
  Produto:Produto;
  codOrcamento:string;
  constructor(Produto:Produto, codOrcamento:string){
    this.Produto  =  Produto;
    this.codOrcamento =  codOrcamento;
  }
}
export interface EntregaOrcamento{
  cep?:string
}
