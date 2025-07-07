import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';

export interface ToastOptions<T = unknown> {
  successMessage?: string;
  errorMessage?: string;
  showSuccess?: boolean;
  showError?: boolean;
  formatSuccess?: (data: T) => string;
  formatError?: (error: any) => string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiResponseHandlerService {
  private toast = inject(HotToastService);

  handle<T>(options: ToastOptions = {}) {
    return (source$: Observable<T>) =>
      source$.pipe(
        tap((response: T) => {
          if (options.showSuccess) {
            const message =
              options.formatSuccess?.(response) ??
              options.successMessage ??
              'Success';
            this.toast.success(message, {
              duration: 2000,
              autoClose: true,
              style: {
                border: '1px solid #04b904',
                padding: '16px',
                color: '#713200',
              },
              iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
              }
            });
          }
        }),
        catchError((err) => {
          if (options.showError) {
            const message =
              options.formatError?.(err) ??
              err?.error?.message ??
              options.errorMessage ??
              'Something went wrong';
            this.toast.error(message, {
              duration: 2000,
              autoClose: true,
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
              },
              iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
              }
            });
          }
          return throwError(() => err);
        })
      );
  }
}
