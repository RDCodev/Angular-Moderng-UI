import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
  standalone: true,
  selector: 'DialogTitle',
  template: `<ng-content/>`,
  imports: [ CommonModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DialogTitle { }