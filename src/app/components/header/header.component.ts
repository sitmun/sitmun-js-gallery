import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estatSessio = 'Iniciar Sessió';
  logged: false;

  constructor() { }

  ngOnInit(): void {
    if (this.logged) {
      this.estatSessio = 'Tancar Sessió';
    }
  }

}
