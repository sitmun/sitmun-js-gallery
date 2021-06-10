import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = 'user12';
  password = 'user12';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.logIn);
  }

  login(): void {
    console.log('logging in...');
    this.authService.login(this.username, this.password);
  }

  logout(): void {
    console.log('logging out...');
    this.authService.logout();
  }

}
