import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { AplicarCodigoPromocional } from '../../../../../data/store/actions/orcamento.actions';

@Component({
  selector: 'codeby-caixa-codigo-promocional',
  templateUrl: './caixa-codigo-promocional.component.html',
  styleUrls: ['./caixa-codigo-promocional.component.scss']
})
export class CaixaCodigoPromocionalComponent {
  @Input()CodigoPromocional:string;
  constructor(private store:Store) {
  }


  AplicarCodigo(codigo:string){
    console.log(codigo)
    this.store.dispatch(new AplicarCodigoPromocional(this.CodigoPromocional));
  }

}
