import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModelsComponent } from './models/models.component';
import { MenuComponent } from './menu/menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, ModelsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mr Budget';

}
