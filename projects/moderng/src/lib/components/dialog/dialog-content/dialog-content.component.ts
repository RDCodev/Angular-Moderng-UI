import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DialogContentToken } from './dialog-content.token';

@Component({
  standalone: true,
  selector: 'DialogContent',
  template: `
    <ng-template #dialogContent>
      <div class=" 
        before:block before:absolute before:top-0 before:left-0 before:bg-gray-950/75 before:size-full before:z-0 
        backdrop-blur-sm h-screen w-screen flex items-center justify-center relative"
      >
        <div class="w-max z-[1000] h-max min-w-[calc(100vw-70%)] max-w-[calc(100vw-60%)] p-4 rounded-xl bg-white border border-gray-300 shadow-lg flex flex-col">
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: '',
  },
  providers: [
    {
      provide: DialogContentToken,
      useExisting: DialogContent,
    },
  ],
})
export class DialogContent {

  public contentRef = viewChild<TemplateRef<any>>("dialogContent")

}