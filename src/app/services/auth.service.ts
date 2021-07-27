import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import SitmunJS from '@sitmun/sitmun-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://sitmun-backend-core.herokuapp.com/api/authenticate';
  token;
  SitmunJsClient = new SitmunJS({ basePath: 'https://sitmun-backend-core.herokuapp.com/' });

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  async llistaMunicipis() {
    return await this.SitmunJsClient.workspace();
  }

  /* login(username: string, password: string): void {
    this.http.post(this.api, {username, password}).subscribe((resp: any) => {
      localStorage.setItem('token', resp.id_token);
      console.log('LOGGED IN with token: ' + localStorage.getItem('token'));
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    console.log('LOGGED OUT!');
  } */

}
