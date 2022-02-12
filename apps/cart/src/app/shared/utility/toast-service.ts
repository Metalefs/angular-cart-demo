import { Injectable, TemplateRef } from '@angular/core';
import swal from 'sweetalert2';
@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showConfirm(title:string, text:string, callback:any) {
    swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  showStandard(text:string) {
    swal.fire({
      title: '',
      text: text,
      icon: 'success',
      showConfirmButton: false
    });
  }

  showSuccess(text:string, delay:number = 3000) {
    swal.fire({
      title: 'Sucesso',
      text: text,
      timer: delay,
      icon: 'success',
      showConfirmButton: false
    });
  }

  showError(dangerTpl:string, delay:number = 15000) {
    swal.fire({
      title: 'Erro',
      text: dangerTpl,
      html: dangerTpl,
      timer: delay,
      icon: 'error',
      showConfirmButton: true
    });
  }

  remove(toast: TemplateRef<any>) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
