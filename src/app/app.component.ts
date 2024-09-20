import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { 
  matKeyboardArrowRightOutline,
  matAutorenewOutline,
  matMailOutlineOutline
} from "@ng-icons/material-icons/outline"
import { Button } from '../../projects/moderng/src/lib/components/button/button.component';

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
