import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  succes : boolean = false;
  message : String = '';

  signUpForm : FormGroup;

  constructor(
    private authService : AuthService,
    private formBuilder: FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() : void {
    this.signUpForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  SignUp() : void {
    const formData = this.signUpForm.getRawValue();
    const pangolinData = {
      username : formData.username,
      password : formData.password
    };
    console.log(pangolinData);
    this.authService.signUp(pangolinData).subscribe(
      res => {
        console.log(res);
        this.succes = true;
        this.message = "Pangoo"
      },
      error => {
        this.message = error.error.message;
        this.succes = false;
        
      }
    );
  }

}
