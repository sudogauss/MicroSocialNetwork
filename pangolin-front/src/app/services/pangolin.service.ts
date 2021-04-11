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

  private username : string;
  private online : boolean = false;

  constructor(private http: HttpClient, private tokenService : TokenService) { }

  getInfos() : Observable<any> {
    console.log(this.tokenService.getToken());
    console.log(this.username);
    return this.http.get(API_URL + 'infos', {headers: {token_header : this.tokenService.getToken()} , params : {username : this.username}, responseType : 'json'});
  }

  setInfos(data : any) : Observable<any> {
    return this.http.put(API_URL + 'infos', {
      age : data.age,
      family : data.family,
      race : data.race,
      food : data.food
    }, {headers: {token_header : this.tokenService.getToken()} , params : {username : this.username}, responseType : 'json'});
  }

  getFriendsAndUsers() : Observable<any> {
    return this.http.get(API_URL + 'friends', {headers: {token_header : this.tokenService.getToken()} , params : {username : this.username}, responseType : 'json'});
  }

  addFriend(friend : any) : Observable<any> {
    return this.http.put(API_URL + 'friends', {
      friendUserName : friend.username
    }, {headers: {token_header : this.tokenService.getToken()} , params : {username : this.username}, responseType : 'json'});
  }

  saveUsername(username : string) {
    this.username = username;
  }

  clearUsername() {
    this.username = '';
  }

  isOnline() : boolean{
    return this.online;
  }

  setOnline() {
    this.online = true;
  }

  removeOnline() {
    this.online = false;
  }

  getUsername() : string{
    return this.username;
  }
}
