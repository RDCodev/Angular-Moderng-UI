import { CommonModule } from "@angular/common";
import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  HostBinding, 
  Input, 
  Output, 
  signal, 
  ViewEncapsulation 
} from "@angular/core";

const base = "w-full";

const buildAccordionClass = (): string => 
  `${base}`

type AccordionType = "single" | "multiple";

@Component({
  standalone: true,
  selector: 'Accordion',
  template: `<ng-content/>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule ],
  host: { }
})
export class Accordion { 

  @Input() type: AccordionType | undefined;

  @Input() collapsible: boolean = false;

  @Input() set value(value: any) {
    this._value.set(value);
  }

  get value() {
    return this._value()
  }

  @Output() valueChange = new EventEmitter<any>();

  private _value = signal<any>(null);

  @HostBinding('class')
  get classes() {
    return buildAccordionClass()
  }

  public isOpen(value: any): boolean {

    if(this.type === "multiple") {
      return (this.value as any[]).includes(value) ?? false;
    }

    return this.value === value;
  }

  public toggle(value: any): void {

    const isOpen = this.isOpen(value);

    if (this.type === "single" && isOpen && !this.collapsible) return

    if (this.type === "single") {
      this.value = isOpen ? null : value; return;
    }

    const values = (this.value as any[]) ?? [];

    if (isOpen) {
      this.value = values.filter(item => item !== value);
    }

    if (!isOpen) {
      this.value = [...values, value]
    }

  }
}





