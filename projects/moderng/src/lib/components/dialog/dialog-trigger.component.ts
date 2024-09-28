import { CommonModule } from "@angular/common";
import { ApplicationRef, ChangeDetectionStrategy, Component, HostBinding, inject, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { DialogService } from "./dialog.service";

const base = "h-full w-full"

@Component({
  standalone: true,
  selector: 'DialogTrigger',
  template: `<ng-content/>`,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'lauch($event)'
  }
})
export class DialogTrigger {

  private readonly _dialog = inject(DialogService);
  private readonly _viewRef = inject(ViewContainerRef);

  public lauch(event: Event) {
    console.log(this._dialog, this._viewRef)
  }

  @HostBinding('class')
  get class() {
    return base
  }
}