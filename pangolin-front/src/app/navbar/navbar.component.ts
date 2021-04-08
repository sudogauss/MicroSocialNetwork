import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../services/pangolin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navBarStatus: boolean = true;

  constructor(private pangolinService : PangolinService) { }

  ngOnInit(): void {
  }

  isOnline() : boolean {
      return this.pangolinService.isOnline();
  }

}
