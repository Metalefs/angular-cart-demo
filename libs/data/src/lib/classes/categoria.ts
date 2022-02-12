import { entidadeBase } from '../interfaces/entity';

export class Categoria implements entidadeBase {
    Nome:string;

    constructor(Nome:string){
      this.Nome = Nome;
    }
    DataHoraCriacao!: Date;
    DataHoraAlteracao!: Date;
    DataHoraExclusao!: Date;
}
