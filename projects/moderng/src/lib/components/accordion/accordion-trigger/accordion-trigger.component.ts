import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject, Input, signal, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matKeyboardArrowDownOutline } from "@ng-icons/material-icons/outline";
import { AccordionItem } from "../accordion-item/accordion-item.component";
import { Accordion } from "../accordion/accordion.component";

const base = "flex"

const buildAccordionTriggerClass = (): string => `${base}`

type AccordionState = "open" | "close";

@Component({
  standalone: true,
  selector: 'AccordionTrigger',
  template: `
      <button 
        type="button"
        [attr.data-state]="state"
        [attr.aria-controls]="null" 
        [attr.aria-expanded]="state"
        [disabled]="disabled"
        class="flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>ng-icon]:rotate-180"
        (click)="toggleAccordion()"
      >
        <ng-content/>
        <ng-icon name="matKeyboardArrowDownOutline"/>
      </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ 
    CommonModule,
    NgIconComponent 
  ],
  providers: [
    provideIcons({
      matKeyboardArrowDownOutline
    })
  ],
  host: { }
})
export class AccordionTrigger { 

  private readonly item = inject(AccordionItem);

  private readonly accordion = inject(Accordion);

  get state() {
    return this.item.state()
  }

  get disabled() {
    return this.item.disabled
  }

  public toggleAccordion() {

    if(this.item.disabled) return;

    this.accordion.toggle(this.item.value)
  }

  @HostBinding("class")
  get classes() {
    return buildAccordionTriggerClass()
  }
}