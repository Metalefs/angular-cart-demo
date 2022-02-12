import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, pipe } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { slideInOut, fade } from '../../../../animations';
import { OrcamentoState } from '../../../../data/store/state';
import { CheckoutService } from '../../checkout.service';

import { entities, enums } from '@codeby/data';
import { ResetarOrcamento } from '../../../../data/store/actions/orcamento.actions';

@Component({
  selector: 'codeby-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss'],
  animations: [fade, slideInOut]
})
export class ConfirmacaoComponent implements OnInit {
  @Input() edit = true;
  @Input() exibirTabela = true;
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<entities.Orcamento>;
  ErroCadastro: false;
  Total = 0;
  Orcamento: entities.Orcamento;
  reload=true;
  constructor(public checkoutService: CheckoutService, private store: Store, private snack: MatSnackBar,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x => {
      this.Orcamento = x;
      if (x.Status == enums.StatusOrcamento.enviado) {
        this.snack.open("Pedido já foi enviado! Responderemos em até 48 horas.", "Fechar", { duration: 5000 }).afterOpened().subscribe(x => {
          this.store.dispatch(new ResetarOrcamento());
        });
      }
      this.Total = this.Orcamento.Preco;
      this.reload = true;
      this.edit = true
      this.cdr.detectChanges();
    })
  }

}
