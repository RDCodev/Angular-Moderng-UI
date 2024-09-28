import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DialogConfigToken, provideDialogConfig } from './dialog.config';
import { DialogRef } from './dialog-ref';

const base = 'block w-min h-min';

@Component({
  standalone: true,
  selector: 'Dialog',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  providers: [],
  host: {},
})
export class Dialog implements OnInit, OnDestroy {

  private readonly config = inject(DialogConfigToken, { optional: true });

  private readonly dialogRef = inject(DialogRef, { optional: true });

  ngOnInit(): void {
    console.log(this.config);
  }

  ngOnDestroy(): void {}

  @HostBinding('class')
  get class() {
    return base;
  }
}
