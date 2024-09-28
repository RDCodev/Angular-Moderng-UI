import {
  inject,
  Injectable,
  Injector,
  StaticProvider,
  TemplateRef,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { DialogRef } from './dialog-ref';
import { Subject } from 'rxjs';
import {
  defaultDialogConfig,
  DialogConfig,
  DialogConfigToken,
} from './dialog.config';
import { TemplatePortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly config =
    inject(DialogConfigToken, { optional: true }) ?? defaultDialogConfig;

  private readonly overlay = inject(Overlay);
  private readonly overlayContainer = inject(OverlayContainer);
  
  private readonly scrollStrategy =
    this.config.scrollStrategy ?? this.overlay.scrollStrategies.block();
  private readonly dialogService = inject(DialogService, {
    optional: true,
    skipSelf: true,
  });

  private currentDialogs: DialogRef[] = [];

  private readonly afterCloseDialog = new Subject<void>();
  private readonly afterOpenDialog = new Subject<DialogRef>();

  open(
    templateRef: TemplateRef<DialogContext>,
    config?: DialogConfig
  ): DialogRef {
    const defaultConfig = this.config;
    config = { ...defaultConfig, ...config };
    config.id = config.id;

    const overlayConfig = this.getOverlayConfig(config);
    const overlayRef = this.overlay.create(overlayConfig);
    const dialogRef = new DialogRef(overlayRef, config);
    const injector = this.createInjector(config, dialogRef, undefined);

    const context: DialogContext = {
      $implicit: dialogRef,
      close: dialogRef.close.bind(dialogRef)
    }

    overlayRef.attach(new TemplatePortal(templateRef, config.viewContainerRef!, context, injector));

    (this.currentDialogs as DialogRef[]).push(dialogRef);
    dialogRef.closed.subscribe(() => this.removeOpenDialog(dialogRef, true));
    this.afterOpenDialog.next(dialogRef);

    return dialogRef
  }

  private getAfterAllClosed(): Subject<void> {
    const parent = this.dialogService;
    return parent ? parent.getAfterAllClosed() : this.afterCloseDialog;

  }

  private removeOpenDialog(dialogRef: DialogRef, emitEvent: boolean) {
    const index = this.currentDialogs.indexOf(dialogRef);

    if(index > -1) {
      (this.currentDialogs as DialogRef[]).splice(index, 1);

      if(!this.currentDialogs.length) {
        if(emitEvent) {
          this.getAfterAllClosed().next();
        }
      }
    }
  }

  private createInjector(
    config: DialogConfig,
    dialogRef: DialogRef,
    fallbackInjector: Injector | undefined
  ): Injector {
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers: StaticProvider[] = [
      { provide: DialogRef, useValue: dialogRef },
    ];

    return Injector.create({
      parent: userInjector || fallbackInjector,
      providers,
    });
  }

  private getOverlayConfig(config: DialogConfig): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.getOverlayPositionStrg(),
      scrollStrategy: this.getOverlayScrollStrg(),
      hasBackdrop: false,
      disposeOnNavigation: config.closeOnNaviation,
    });
  }

  private getOverlayPositionStrg() {
    return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }

  private getOverlayScrollStrg() {
    return this.config.scrollStrategy || this.scrollStrategy;
  }
}

export interface DialogContext {
  $implicit: DialogRef;
  close: () => void;
}
