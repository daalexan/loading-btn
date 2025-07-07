import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LoadingButtonComponent } from '../shared/components/loading-button/loading-button.component';
import { MockApiService } from '../core/services/mock-api.service';
import { ApiResponseHandlerService } from '../core/services/api-response-handler.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-main-container',
  imports: [
    LoadingButtonComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  $isLoading = signal<boolean>(false);

  private mockApiService = inject(MockApiService);
  private apiHandlerService = inject(ApiResponseHandlerService);

  handleLoadBtnClick() {
    this.$isLoading.set(true);
    this.mockApiService.save()
      .pipe(
        this.apiHandlerService.handle({
          showSuccess: true,
          successMessage: 'Data saved!',
          showError: true,
          errorMessage: 'Failed to save data',
          formatSuccess: () => {
            return 'custom response handler works';
          }
        }),
        catchError(() => {
          this.$isLoading.set(false);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.$isLoading.set(false);
      });
  }
}
