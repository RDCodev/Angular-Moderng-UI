import { inject, InjectionToken } from "@angular/core";
import { Dialog } from "./dialog.component";

export const DialogToken = new InjectionToken<Dialog>('DialogToken');