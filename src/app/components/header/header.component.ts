import { Component, OnInit } from '@angular/core';
import SitmunJS from '@sitmun/sitmun-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = 'user12';
  password = 'user12';
  paraulaInici;
  SitmunJsClient = new SitmunJS({ basePath: 'https://sitmun-backend-core.herokuapp.com/' });

  constructor() { }

  ngOnInit(): void {
    if (this.SitmunJsClient.isLogged()){
      this.paraulaInici = 'Tancar Sessió';
    }
    else{
      this.paraulaInici = 'Iniciar Sessió';
    }
  }

  login(): void {
    console.log('logging in...');
    this.SitmunJsClient.login('user12', 'user12').then(() => {
      console.log('Successful');
      this.paraulaInici = 'Tancar Sessió';
    });
  }

  logout(): void {
    console.log('logging out...');
    this.SitmunJsClient.logout();
    this.paraulaInici = 'Iniciar Sessió';
    console.log('Successful');
  }

  loginout(): void{
    if (this.paraulaInici === 'Iniciar Sessió'){
      this.login();
    }
    else {
      this.logout();
    }
  }

}
