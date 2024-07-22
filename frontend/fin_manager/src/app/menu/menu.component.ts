import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})


export class MenuComponent {
  constructor(private service:LoginService){}
  ngOnInit(){
    // this.logout()
  }

  logout(){
    this.service.logout()
    location.reload()
  }
}
