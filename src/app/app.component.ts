import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { 
  matKeyboardArrowRightOutline,
  matAutorenewOutline,
  matMailOutlineOutline
} from "@ng-icons/material-icons/outline"
import { Button, DialogClose } from '@moderng/components';
import { Accordion } from '@moderng/components';
import { AccordionContent } from '@moderng/components';
import { AccordionItem } from '@moderng/components';
import { AccordionTrigger } from '@moderng/components';
import { Dialog } from '@moderng/components';
import { DialogTrigger } from "@moderng/components";
import { DialogContent } from "@moderng/components";
import { DialogHeader } from "@moderng/components";
import { DialogDescription } from "@moderng/components";
import { DialogTitle } from "@moderng/components";
import { DialogFooter } from "@moderng/components";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    Button,
    NgIconComponent,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogClose
],
  viewProviders: [
    provideIcons({
      matKeyboardArrowRightOutline,
      matAutorenewOutline,
      matMailOutlineOutline
    })
  ]
})
export class AppComponent { 

  public status: boolean = true;

  public toggle() {
    this.status = !this.status;
  }

  public serverStateClass() {
    return {
      'bg-green-500': this.status,
      'bg-red-500': !this.status
    }
  }
}
