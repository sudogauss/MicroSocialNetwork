import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  succes : boolean = false;
  err : boolean = false;
  message : String = '';

  loginForm : FormGroup;

  constructor(
    private authService : AuthService,
    private formBuilder : FormBuilder
    ) 
    { 
      this.createForm();
    }

  createForm() : void {
    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  Login() : void {
    const formData = this.loginForm.getRawValue();
    const credentials = {
      username : formData.username,
      password : formData.password
    };

    this.authService.login(credentials).subscribe(
      res => {
        console.log(res);
        this.succes = true;
        this.err = false;
        this.message = "Hi " + credentials.username;
      },
      error => {
        this.message = error.error.message;
        this.succes = false;
        this.err = true;
        this.message = "Nooooooooo!!!! Panerror";
      }
    );
  }

}
