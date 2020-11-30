import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "./models/product.model";
import {environment} from "../environments/environment";
import {User} from "./models/user.model";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: string;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router) { }

  private _token = new BehaviorSubject<string>('');
  private _userId = new BehaviorSubject<number>(null);
  private _userName = new BehaviorSubject<string>('');
  private _isAdmin = new BehaviorSubject<boolean>(false);
  private _loggedIn = new BehaviorSubject<boolean>(false);

  readonly token = this._token.asObservable();
  readonly userId = this._userId.asObservable();
  readonly userName = this._userName.asObservable();
  readonly isAdmin = this._isAdmin.asObservable();
  readonly loggedIn = this._loggedIn.asObservable();
  
  
  
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

  getUser(userId: string): Observable<User[]>{
    return this.httpClient.get<User[]>(environment.endpointURL + 'user/' + userId);
  }

  logout(){
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    this.checkUserStatus();
    this.toastr.success('Logged out')
  }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  login(userName: string, password:string) {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: userName,
      password: password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userId', res.user.userId);      
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('isAdmin', res.user.isAdmin);

      this.checkUserStatus();
      this.router.navigate(['']);
      this.toastr.success('Logged in');
    }, (error: any) => {
      this.toastr.error('Invalid username or password');
    });

  }

  checkUserStatus(): void {
    // Get user data from local storage
    this._token.next(localStorage.getItem('userToken'));
    this._userId.next( Number.parseInt(localStorage.getItem('userId')));
    this._userName.next(localStorage.getItem('userName'));
    this._isAdmin.next(localStorage.getItem('isAdmin') === 'true');
    // Set boolean whether a user is logged in or not
    this._loggedIn.next(!(localStorage.getItem('userToken') === null));
    console.log(!(localStorage.getItem('userToken') === null))
  }

}
