import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ElectericShopAdminPanel.UI';
  user = new User();

  constructor(private authService: AuthService) {}

  login(user: User) {
    this.authService.login(user).subscribe((token: string) => {
        localStorage.setItem('authToken', token);
    });
  }

  getme() {
    this.authService.getMe().subscribe((name: string) => {
        console.log(name);
    });
  }
}
