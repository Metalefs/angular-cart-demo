import { StatusOrcamento } from '../enums/StatusOrcamento';
import { entidadeBase } from '../interfaces/entity';
import { Produto } from '.';
export class Orcamento implements entidadeBase{

    Produto:CodProduto[];
    Empresa:string;
    Status:StatusOrcamento;
    Preco:number;
    Mensagem:string;

    Dimensoes?:string;
    CupomDesconto?:string;
    constructor(
      Produto:CodProduto[],
      Empresa:string,
      Status:StatusOrcamento,
      Preco:number,
      Mensagem:string,
      CupomDesconto:string,
    ){
        this.Produto = Produto;
        this.Empresa = Empresa;
        this.Status = Status;
        this.Preco = Preco;
        this.Mensagem = Mensagem;
        this.CupomDesconto = CupomDesconto;
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
