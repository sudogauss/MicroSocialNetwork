import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

const API_URL = 'http://localhost:8080/api/data/'
//const TOKEN_HEADER = 'x-access-token';

@Injectable({
  providedIn: 'root'
})
export class PangolinService {

  username : string;

  constructor(private http: HttpClient, private tokenService : TokenService) { }

  getInfos() : Observable<any> {
    console.log(this.tokenService.getToken());
    console.log(this.username);
    return this.http.get(API_URL + 'infos', {headers: {token_header : this.tokenService.getToken()} , params : {username : this.username}, responseType : 'json'}, );
  }

  saveUsername(username : string) {
    this.username = username;
  }
}
