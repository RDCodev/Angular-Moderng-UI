import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, HostBinding, inject, Input, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccordionTrigger } from './accordion-trigger.component';
import { AccordionContent } from './accordion-content.component';
import { Accordion } from './accordion.component';

const base = "border-b";

const buildAccordionItemClass = (): string => 
  `${base}`

type AccordionState = "close" | "open"

@Component({
  standalone: true,
  selector: 'AccordionItem',
  template: `<ng-content/>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule ],
  host: { 
    '[attr.data-state]': 'state()',
    '[attr.data-disabled]': 'disabled'
  },
})
export class AccordionItem {

  private readonly accordion = inject(Accordion);

  @Input() value: string | undefined;

  @Input() disabled: boolean = false;

  public state = computed<AccordionState>(() => 
    this.accordion.isOpen(this.value) ? "open" : "close");

  @ViewChild(AccordionTrigger) trigger!: AccordionTrigger;

  @ViewChild(AccordionContent) content!: AccordionContent;

  @HostBinding('class')
  get classes() {
    return buildAccordionItemClass();
  }

}
