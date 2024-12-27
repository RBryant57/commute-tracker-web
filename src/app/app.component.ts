import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button'

import { CommuteComponent } from './commute/commute.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommuteComponent, MatToolbar, MatIcon, MatMenu, MatButton, MatMenuTrigger, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'commute-tracker-web';
}
