import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PangolinService } from '../services/pangolin.service';

@Component({
  selector: 'app-new-best-friend',
  templateUrl: './new-best-friend.component.html',
  styleUrls: ['./new-best-friend.component.css']
})
export class NewBestFriendComponent implements OnInit {

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
  }

  createForm() : void {
    this.newFriendForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
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
        let friend = {
          username: pangolinData.username
        } 
        this.pangolinService.addFriend(friend).subscribe(res => console.log(res));
        this.router.navigate(['home']);
      },
      error => {
        alert("Ouups!!!!")
      }
    );
  }

}
