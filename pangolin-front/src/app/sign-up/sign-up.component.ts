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
  err : boolean = false;
  message : String = '';

  signUpForm : FormGroup;

  constructor(
    private authService : AuthService,
    private formBuilder: FormBuilder
    ) 
    { 
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
    this.authService.signUp(pangolinData).subscribe(
      res => {
        console.log(res);
        this.succes = true;
        this.err = false;
        this.message = "Pangolin est pret"
      },
      error => {
        this.message = "NOOOOOOO!!! On te veux pas parmi les pangolinios!!!"
        this.succes = false;
        this.err = true;
      }
    );
  }

}
