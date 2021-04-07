import { Injectable } from '@angular/core';

const AUTH_KEY = "auth-token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public signOut() : void {
    window.sessionStorage.clear();
  }

  public saveToken(token : string):void {
    window.sessionStorage.removeItem(AUTH_KEY);
    window.sessionStorage.setItem(AUTH_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(AUTH_KEY);
  }
}
