import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonSize, ButtonVariant } from './button.interface';
import { CommonModule } from '@angular/common';

const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 transition-colors"

const variants: Record<string, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow",
  outline: "bg-background border border-input hover:text-accent-foreground hover:bg-accent shadow",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
}

const sizes: Record<string, string> = {
  base: "h-9 px-4 py-2",
  icon: "h-9 w-9"
}

const buildBtnClass = (variant: string, size: string): string => 
  `${base} ${variants[variant]} ${sizes[size]}`

@Component({
  standalone: true,
  selector: 'moderng-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  host: {
    '[attr.type]': 'type',
    '[attr.data-disabled]': 'disabled',
    'role': 'button',
    '(click)': '_onClick($event)',
    '(focus)': '_onFocus($event)',
    '(blur)': '_onBlur($event)'
  }
})
export class Button implements OnInit, AfterContentInit, OnDestroy {
  
  @Input() type: string = 'button';

  @Input() disabled: boolean = false;

  @Input() variant: ButtonVariant = 'primary';

  @Input() size: ButtonSize = 'base';

  @Output() onClick = new EventEmitter<Event>();

  @Output() onFocus = new EventEmitter<FocusEvent>();

  @Output() onBlur = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void { }

  ngAfterContentInit(): void { }

  ngOnDestroy(): void { }

  public _onClick(event: Event) {
    this.onClick.emit(event);
  }

  public _onFocus(event: FocusEvent) {
    this.onFocus.emit(event);
  }

  public _onBlur(event: Event) {
    this.onBlur.emit(event);
  }

  @HostBinding('class')
  get classes() {
    return buildBtnClass(this.variant, this.size);
  }

}
