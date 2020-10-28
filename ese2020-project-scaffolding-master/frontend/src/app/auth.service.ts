import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "./models/product.model";
import {environment} from "../environments/environment";
import {User} from "./models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: string;

  constructor(private httpClient: HttpClient) { }

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

  getInfoByUser(userId: string): Observable<User[]>{
    return this.httpClient.get<User[]>(environment.endpointURL + 'user/' + userId);
  }


}
