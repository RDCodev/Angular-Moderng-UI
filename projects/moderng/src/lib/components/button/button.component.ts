import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonVariant } from './button.interface';
import { CommonModule } from '@angular/common';

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
    role: 'button',
    class:
      'inline-flex items-center justify-center whitespace-nowrap h-9 px-4 py-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-colors shadow',
  },
})
export class Button implements OnInit, AfterContentInit, OnDestroy {
  @Input() type: string = 'button';

  @Input() disabled: boolean = false;

  @Input() variant: ButtonVariant = 'primary';

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {}

  ngOnDestroy(): void {}

  @HostBinding('class')
  get hostClasses() {
    return this.variantClass()[this.variant];
  }

  private variantClass: () => { [klass: string]: string } = () => ({
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'bg-background text-accent-foreground hover:bg-accent',
    ghost: 'bg-ghost text-ghost-foreground hover:bg-ghost/80',
    link: 'underline-offset-4 hover:underline',
  });
}
