import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
  standalone: true,
  selector: "moderng-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Input { }