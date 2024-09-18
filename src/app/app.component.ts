import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '../../projects/moderng/src/lib/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    Button
  ],
})
export class AppComponent { 

  public visible: boolean = true;

  public toggle() {
    this.visible = !this.visible;
  }
}
