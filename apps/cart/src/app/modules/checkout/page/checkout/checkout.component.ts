import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Select } from '@ngxs/store';
import { fade, slideInOut, sliderSide } from '../../../../animations';
import { PageScrollService } from '../../../../shared/services/page-scroll.service';
import { OrcamentoState } from '../../../../data/store/state';
import { Observable } from 'rxjs';
import { CheckoutService } from '../../checkout.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { entities } from '@codeby/data';

@Component({
  selector: 'codeby-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [sliderSide, fade, slideInOut]
})
export class CheckoutComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos)
  Orcamento$!: Observable<entities.Orcamento>;

  constructor(
    public checkoutService: CheckoutService,
    private scrollService: PageScrollService,
    @Inject(PLATFORM_ID) private platform: object,
    private router: Router,
    private fb: FormBuilder,
    private snack: MatSnackBar,

  ) { }
  valid = false;
  erros = [];
  Orcamento!: entities.Orcamento;
  confirmar = false;
  CEP!: string;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform))
      this.scrollService.scrollTop();
    this.Orcamento$.subscribe(orc => {
      this.checkoutService.Validate(orc);
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    try {
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch (ex) {
      console.error(ex);
    }
  }

  FinalizarCompra() {
    this.Orcamento$.subscribe(orc => {
      this.checkoutService.Validate(orc);
      if (this.checkoutService.getValid()) {
        this.confirmar = true;
      }
      else {
        this.snack.open("Não foi possível completar a validação do seu pedido. Por favor, verifique os dados e tente novamente", "Fechar", { verticalPosition: "top" }).afterDismissed().subscribe(() => {
          const errors = this.checkoutService.getErros().join(", ");
          this.snack.open(`Verifique os erros: ${errors}`, "Ok", { verticalPosition: "top" })
          this.valid = this.checkoutService.getValid();
        })
      }
    });
  }
}
