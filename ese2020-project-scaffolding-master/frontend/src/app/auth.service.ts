import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string{
    return localStorage.getItem('userToken');
  }

  getAdmin(): boolean{
    return localStorage.getItem('isAdmin') === 'true';
  }

  getUserName(): string{
    return localStorage.getItem('userName');
  }

  isLoggedIn(): boolean{
    const token = this.getToken();
    if (token !== null){
      return true;
    }
    return false;
  }


}
