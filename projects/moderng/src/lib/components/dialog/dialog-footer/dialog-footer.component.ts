import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from "@angular/core";
import { DialogRef } from "../public_api";


@Component({
  standalone: true,
  selector: 'DialogFooter',
  template: `<ng-content/>`,
  imports: [ CommonModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'flex justify-end mt-6 space-x-2'
  },
  viewProviders: []
})
export class DialogFooter implements OnInit {

  private readonly _dialogRef = inject(DialogRef, { optional: true })
  
  ngOnInit(): void {
   console.log("[DialogFooter]... init")
   console.log("[DialogFooter]...", this._dialogRef)
  }

}