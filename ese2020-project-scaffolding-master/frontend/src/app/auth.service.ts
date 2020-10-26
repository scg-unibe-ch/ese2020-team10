import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: string;

  constructor() { }

  getToken(): string{
    return localStorage.getItem('userToken');
  }

  getAdmin(): boolean{
    return localStorage.getItem('isAdmin') === 'true';
  }

  getUserName(): string{
    this.user = localStorage.getItem('userName');
    return this.user[0].toUpperCase() + this.user.substr(1).toLowerCase();
  }


  getUserId(): string {
    return localStorage.getItem('userId');
  }
  isLoggedIn(): boolean{
    const token = this.getToken();
    if (token !== null){
      return true;
    }
    return false;
  }


}
