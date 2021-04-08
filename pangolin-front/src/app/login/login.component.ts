import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PangolinService } from '../services/pangolin.service';
import { TokenService } from '../services/token.service';

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
    private formBuilder : FormBuilder,
    private tokenService : TokenService,
    private pangolinService : PangolinService,
    private router : Router
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
        this.tokenService.saveToken(res.accessToken);
        this.pangolinService.saveUsername(credentials.username);
        this.pangolinService.setOnline();
        this.message = "Hi " + credentials.username;
        this.router.navigate(['home']);
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
