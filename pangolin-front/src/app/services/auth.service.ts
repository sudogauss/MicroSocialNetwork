import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API_URL = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API_URL + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  signUp(pangolin): Observable<any> {
    return this.http.post(AUTH_API_URL + 'signup', {
      username: pangolin.username,
      password: pangolin.password
    }, httpOptions);
  }
}
