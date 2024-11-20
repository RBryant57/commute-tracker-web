import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommuteComponent } from './commute/commute.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommuteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'commute-tracker-web';
}
