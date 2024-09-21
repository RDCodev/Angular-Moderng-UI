import { CommonModule } from "@angular/common";
import { 
  ChangeDetectionStrategy, 
  Component, 
  HostBinding, 
  inject, 
  Input, 
  signal, 
  ViewEncapsulation 
} from "@angular/core";
import { Accordion } from "./accordion.component";
import { AccordionItem } from "./accordion-item.component";
import { injectDimensions } from "../../utils/dimensions";

const base = "overflow-hidden text-sm data-[state=close]:hidden data-[state=open]:visible"

const buildAccordionContentClass = (): string => 
  `${base}`

type AccordionState = "open" | "close"

@Component({
  standalone: true,
  selector: 'AccordionContent',
  template: `
    <div class="pb-4 pt-0">
      <ng-content/>
    </div>
  `,
  imports: [ CommonModule ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'region',
    '[attr.data-state]': 'dimensions().mounted ? item.state() : null',
    '[attr.aria-labelledby]': 'null',
    '[style.--mng-accordion-content-width.px]':'dimensions().width',
    '[style.--mng-accordion-content-height.px]':'dimensions().height'
  }
})
export class AccordionContent { 

  private readonly accordion = inject(Accordion);
  private readonly item = inject(AccordionItem);

  @HostBinding('class')
  get classes() {
    return buildAccordionContentClass()
  }

  protected readonly dimensions = injectDimensions();

} 