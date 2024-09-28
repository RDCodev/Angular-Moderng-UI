import { ScrollStrategy } from "@angular/cdk/overlay";
import { InjectionToken, Injector, Provider, ViewContainerRef } from "@angular/core";

export type DialogRole = "dialog" | "alterdialog"

export interface DialogConfig {
  viewContainerRef?: ViewContainerRef;
  injector?: Injector;
  id?: string;
  role?: DialogRole;
  modal?: boolean;
  scrollStrategy?: ScrollStrategy;
  closeOnNaviation?: boolean;
}

export const defaultDialogConfig: DialogConfig = {
  role: "dialog",
  modal: true,
  closeOnNaviation: true
};

export const DialogConfigToken = new InjectionToken<DialogConfig>("DialogConfigToken")

export function provideDialogConfig(config: Partial<DialogConfig>): Provider[] {
  return [
    {
      provide: DialogConfigToken,
      useValue: { ...defaultDialogConfig, ...config }
    }
  ]
}