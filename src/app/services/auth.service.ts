import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://sitmun-backend-core.herokuapp.com/api/authenticate';
  token;

  constructor(private http: HttpClient) { }
  login(username: string, password: string): void {
    this.http.post(this.api, {username, password}).subscribe((resp: any) => {
      localStorage.setItem('token', resp.id_token);
      console.log('LOGGED IN with token: ' + localStorage.getItem('token'));
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    console.log('LOGGED OUT!');
  }
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
