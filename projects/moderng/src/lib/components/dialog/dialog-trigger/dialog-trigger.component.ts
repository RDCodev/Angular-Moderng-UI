import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  EnvironmentInjector,
  forwardRef,
  inject,
  runInInjectionContext,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { DialogRef } from '../dialog/dialog-ref';
import { DialogContentToken } from '../dialog-content/dialog-content.token';
import { Dialog, DialogContent, DialogToken } from '../public_api';
import { DialogTriggerToken } from './dialog-trigger.token';

@Component({
  standalone: true,
  selector: 'DialogTrigger',
  template: `<ng-content />`,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'block h-max w-max',
    '(click)': 'lauch($event)',
  },
  providers: [
    {
      provide: DialogTriggerToken,
      useExisting: DialogTrigger,
    },
  ],
})
export class DialogTrigger {

  private readonly _dialog = inject(DialogService);

  private readonly _viewRef = inject(ViewContainerRef);

  private _content = contentChild(DialogContent);

  public lauch(event: Event) {

    const contentRef = this._content()?.contentRef()!;

    this._dialog.open(contentRef, { viewContainerRef: this._viewRef });
  }
}
