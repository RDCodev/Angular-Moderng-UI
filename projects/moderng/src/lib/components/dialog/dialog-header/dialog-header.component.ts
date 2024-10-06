import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
  standalone: true,
  selector: 'DialogHeader',
  template: `<ng-content/>`,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "flex flex-col space-y-1.5 text-center"
  }
})
export class DialogHeader { }