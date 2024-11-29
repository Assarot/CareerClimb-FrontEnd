import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './LayoutDefault/sidebar/sidebar.component';
import { NavbarComponent } from './LayoutDefault/navbar/navbar.component';
import { FooterComponent } from './LayoutDefault/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-CareerClimb';
}
