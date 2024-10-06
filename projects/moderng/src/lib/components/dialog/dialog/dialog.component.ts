import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  forwardRef,
  HostBinding,
  inject,
  input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { DialogConfigToken } from '../config/dialog.config';
import { DialogRef } from './dialog-ref';
import { DialogContent } from '../dialog-content/dialog-content.component';
import { DialogToken } from './dialog.token';

@Component({
  standalone: true,
  selector: 'Dialog',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  providers: [
    {
      provide: DialogToken,
      useExisting: Dialog,
    },
  ],
  host: {
    class: 'contents',
    tabindex: '-1',
    '[attr.role]': 'role()',
    '[attr.aria-modal]': 'modal()',
  },
})
export class Dialog implements OnDestroy {

  private readonly config = inject(DialogConfigToken, { optional: true });

  private readonly dialogRef = inject(DialogRef, { optional: true });

  public readonly id = input<string>();

  public readonly role = input(this.config?.role);

  public readonly modal = input<boolean>(this.config?.modal ?? false);

  public readonly dialogContent = contentChild(DialogContent, {
    descendants: true,
  });

  ngOnDestroy(): void {
    this.close();
  }

  public close() {
    this.dialogRef?.close();
  }
}
