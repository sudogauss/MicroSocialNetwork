import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PangolinService } from '../services/pangolin.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  pangos : Array<any>;
  friends : Array<any>;

  newFriendForm : FormGroup;

  constructor(
    private pangolinService : PangolinService,
    private router : Router,
    private authService : AuthService,
    private formBuilder : FormBuilder
    ) { 
      this.createForm();
    }

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

  createForm() : void {
    this.newFriendForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  addToFriendList(username : string) : void {
    const friend = {
      username : username
    }
    this.pangolinService.addFriend(friend).subscribe(res => console.log(res));
    this.ngOnInit();
  }

  deleteFromFriendList(username : string) : void {
    const friend = {
      username : username
    }
    this.pangolinService.deleteFriend(friend).subscribe(res => console.log(res));
    this.ngOnInit();
  }

  createNewFriend() : void {
    const formData = this.newFriendForm.getRawValue();
    const pangolinData = {
      username : formData.username,
      password : formData.password
    };
    this.authService.signUp(pangolinData).subscribe(
      res => {
        console.log(res);
        this.addToFriendList(formData.username);
      },
      error => {
        alert("Ouups!!!!")
      }
    );
  }

}
