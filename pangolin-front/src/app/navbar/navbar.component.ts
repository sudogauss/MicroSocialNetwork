import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PangolinService } from '../services/pangolin.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navBarStatus: boolean = true;

  constructor(
    private pangolinService : PangolinService,
    private router : Router,
    private tokenService : TokenService
    ) { }

  ngOnInit(): void {
  }

  isOnline() : boolean {
      return this.pangolinService.isOnline();
  }

  logOut() : void {
    this.pangolinService.clearUsername();
    this.pangolinService.removeOnline();
    this.tokenService.signOut();
    this.router.navigate(['home']);
  }

  switchMenu() : void {
    console.log("Works");
    this.navBarStatus = !this.navBarStatus;
  }

}
