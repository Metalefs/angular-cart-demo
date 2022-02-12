import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EditarOrcamentoLocal } from '../../data/store/actions/orcamento.actions';

import { entities } from '@codeby/data';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public static DadosCompleto:boolean;
  public static EnderecoCompleto:boolean;
  public static PagamentoCompleto:boolean;
  public static valid:boolean;
  public static erros:string[] = [];
  constructor(
    private fb: FormBuilder, private store:Store) { }
    dadosForm!:FormGroup;
    enderecoForm!:FormGroup;

  Validate(Orcamento:entities.Orcamento){
    CheckoutService.valid = false;
    CheckoutService.erros = [];


    Orcamento.Produto.forEach((prd :entities.CodProduto)=>{
      if(!prd.Produto.Quantidade || prd.Produto.Quantidade <= 0)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui quantidade selecionada.`);
    })

    CheckoutService.valid = CheckoutService.erros.length == 0;
  }

  AlterarOrcamentoLocal(orcamento:entities.Orcamento){
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.store.dispatch(new EditarOrcamentoLocal(orcamento)).subscribe(() => {

    })
  }


  getValid(){
    return CheckoutService.valid;
  }
  getErros(){
    return CheckoutService.erros;
  }
}
