import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://sitmun-backend-core.herokuapp.com/api';
  token;

  constructor(private http: HttpClient, private router: Router) { }
  login(username: string, password: string): void {
    this.http.post(this.api + '/authenticate', {username, password}).subscribe((resp: any) => {
      this.router.navigate(['profile']);
      localStorage.setItem('auth_token', resp.token);
    });
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
