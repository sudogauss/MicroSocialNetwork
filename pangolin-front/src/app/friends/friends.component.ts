import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../services/pangolin.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  pangos : Array<any>;
  friends : Array<any>;

  constructor(private pangolinService : PangolinService) { }

  ngOnInit(): void {
    this.pangolinService.getFriendsAndUsers().subscribe(res => {
      if(res.pangos) {
        this.pangos = res.pangos;
        this.friends = res.friends;
      } else {
        alert("error");
      }
    });
  }

}
