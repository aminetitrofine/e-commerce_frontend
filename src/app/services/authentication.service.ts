import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users = [
    {username: 'amine', password: '1234', roles: ['Admin', 'user']},
    {username: 'user1', password: '1234', roles: ['user']},
    {username: 'user2', password: '1234', roles: ['user']},
  ];
  public isAuthenticated: boolean | undefined;
  public userAuthenticated;
  public token;

  constructor() {
  }

  public login(username: string, password: string) {
    let user;
    this.users.forEach(u => {
      if (u.username == username && u.password == password) {
        user = u;
        this.token = {username: u.username, roles: u.roles};
      }
    });
    if (user) {
      this.isAuthenticated = true;
      this.userAuthenticated = user;
    } else {
      this.isAuthenticated = false;
      this.userAuthenticated = undefined;
    }
  }

  public isAdmin() {
    if (this.isAuthenticated) {
      if (this.userAuthenticated.roles.indexOf('Admin') > -1)
        return true;
    }
    return false;
  }

  public saveAuthenticatedUser() {
    if (this.userAuthenticated) {
      localStorage.setItem('authToken', btoa(JSON.stringify(this.token)))
    }
  }

  public loadAuthenticatedUser() {
    let token = localStorage.getItem('authToken');
    if (token != null) {
      let user = JSON.parse(atob(token));
      this.userAuthenticated = user;
      this.isAuthenticated = true;
      this.token = token;
    }
  }
  public removeToken(){
    localStorage.removeItem('authToken');
    this.isAuthenticated=false;
    this.token=undefined;
    this.userAuthenticated=undefined;
  }
}
