import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly APIUrl = "https://localhost:7163/api";
  constructor(private http: HttpClient) { }

  public login(user: User): Observable<string> {
    return this.http.post(this.APIUrl + '/Auth/login', user, {
        responseType: 'text'
    });
  }

  isLoggedIn() {
    return localStorage.getItem('authToken')!= null;
  }

  GetToken() {
    return localStorage.getItem('authToken')||'';
  }
}
