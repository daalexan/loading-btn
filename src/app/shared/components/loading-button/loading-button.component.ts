import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-loading-button',
  imports: [NzButtonModule],
  templateUrl: './loading-button.component.html',
  styleUrl: './loading-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingButtonComponent {
  @Input() text: string = 'Load';
  @Input() isLoading: boolean = false;

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
