import { StatusProduto } from '../enums/StatusProduto';
import { entidadeBase } from '../interfaces/entity';

export class Produto implements entidadeBase{
  _id!:string;
  Nome:string;
  Subtitulo:string;
  NomeCategoria:string;
  Preco?:number;
  Imagem:string[];
  Likes?:number = 0;
  Quantidade?:number = 1;
  QuantidadeMinima?:number = 0;
  Status?:StatusProduto;
  PrecoPromocional?:number;
  Parcelas?:number;
  Rating?:number[] = [];
  Codigo?:string;
    constructor(
    Nome:string,
    Subtitulo:string,
    NomeCategoria:string,
    Imagem:string[],
    QuantidadeMinima?:number,
    Preco?:number,
    Likes?:number,
    Status?:StatusProduto,
    PrecoPromocional?:number,
    Rating?:number[],
    ){
      this.Nome = Nome;
      this.Subtitulo = Subtitulo;
      this.NomeCategoria = NomeCategoria;
      this.Imagem = Imagem;
      this.QuantidadeMinima = QuantidadeMinima;
      this.Preco = Preco;
      this.Likes = Likes;
      this.Status = Status;
      this.PrecoPromocional = PrecoPromocional;
      this.Rating = Rating;
    }
    DataHoraCriacao!: Date;
    DataHoraAlteracao!: Date;
    DataHoraExclusao!: Date;

};
