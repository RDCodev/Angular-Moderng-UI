import { Directive, EnvironmentInjector, inject, OnInit, runInInjectionContext } from "@angular/core";
import { DialogCloseToken } from "./dialog-close.token";
import { DialogRef, DialogToken } from "../public_api";

@Directive({
  selector: "[dialogClose]",
  standalone: true,
  providers: [
    {
      provide: DialogCloseToken,
      useExisting: DialogClose
    }
  ],
  host: {
    "(click)": "onClick($event)"
  }
})
export class DialogClose {

  private _dialogRef: DialogRef | null = null

  private readonly _injectEnv = inject(EnvironmentInjector);
  
  public onClick(event: MouseEvent) {
    this.initializeDialogRef();
    console.log(this._dialogRef);
  }

  private initializeDialogRef() {
    runInInjectionContext(this._injectEnv, () => {
      this._dialogRef = inject(DialogRef);
    })
  }
}