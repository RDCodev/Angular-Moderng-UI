import { AfterContentInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  standalone: true,
  selector: "moderng-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.type]': 'type',
    'role': 'button',
    'class': "text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  }
})
export class Button implements OnInit, AfterContentInit, OnDestroy { 
  
  @Input() type: string = 'button';

  @Input() arialabel: string | undefined;
  
  @Input() label: string | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log("Button initialized");
  }

  ngAfterContentInit(): void {
    console.log("Button content initialized");
  }

  ngOnDestroy(): void { 
    console.log("Button destroyed");
  }
  
}