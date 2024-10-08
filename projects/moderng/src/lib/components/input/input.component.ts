import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
  standalone: true,
  selector: "moderng-input",
  template: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule ]
})
export class Input { }