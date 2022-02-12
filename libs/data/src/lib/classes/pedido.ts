import { StatusOrcamento } from '../enums/StatusOrcamento';
import { entidadeBase } from '../interfaces/entity';
import { Produto } from './produto';
import { Orcamento,CodProduto } from './orcamento';

export class Pedido implements entidadeBase{

    Produto:CodProduto[];
    Empresa:string;
    Status:StatusOrcamento;
    Preco:number;
    constructor(
     orcamento:Orcamento
    ){
        this.Produto = orcamento.Produto;
        this.Empresa = orcamento.Empresa;
        this.Status = orcamento.Status;
        this.Preco = orcamento.Preco;
    }

    DataHoraCriacao!: Date;
    DataHoraAlteracao!: Date;
    DataHoraExclusao!: Date;
}

