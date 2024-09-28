import { Observable, Subject, Subscription } from "rxjs";
import { FocusOrigin } from "@angular/cdk/a11y"
import { OverlayRef } from "@angular/cdk/overlay";
import { DialogConfig } from "./dialog.config";


export class DialogRef { 

  disableClose: boolean | undefined;

  readonly closed = new Subject<FocusOrigin | null>();

  readonly outsidePointerEvents!: Observable<MouseEvent>;

  readonly id!: string | undefined;

  private detachSubcription!: Subscription;

  constructor(
    readonly overlayRef: OverlayRef,
    readonly config: DialogConfig
  ){
    this.outsidePointerEvents = overlayRef.outsidePointerEvents();
    this.id = config.id;

    this.detachSubcription = overlayRef.detachments().subscribe(() => this.close())
  }

  close(focusOrigin?: FocusOrigin): void {
    this.overlayRef.dispose();
    this.detachSubcription.unsubscribe();
    this.closed.next(focusOrigin ?? null);
    this.closed.complete();
  }

  updatePosition(): this {
    this.overlayRef.updatePosition();
    return this;
  }
}