import { Directive } from "@angular/core";

@Directive({
  standalone: true,
  selector: "[asChild]",
})
export class AsChildDirective { }