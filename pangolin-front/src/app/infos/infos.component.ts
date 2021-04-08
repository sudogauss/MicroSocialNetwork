import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pangolin } from '../models/Pangolin';
import { PangolinService } from '../services/pangolin.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {

  pangolinInfos : Pangolin;
  modification : boolean = false;
  pangolinInfosForm : FormGroup;

  constructor(
    private pangolinService : PangolinService,
    private formBuilder : FormBuilder,
    private router : Router
    ) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.getInfos();
  }

  async getInfos() {
    this.pangolinService.getInfos().subscribe(infos => {
      console.log(infos.age);
      this.pangolinInfos = {
        username: this.pangolinService.getUsername(),
        age: infos.age,
        family: infos.family,
        race: infos.race,
        food: infos.food
      };
    });
  }

  createForm() {
    this.pangolinInfosForm = this.formBuilder.group({
        age: [0, Validators.required],
        family: ['', Validators.required],
        race: ['', Validators.required],
        food: ['', Validators.required]
    });
  }

  showAge() : number{
    return this.pangolinInfos && this.pangolinInfos.age ? this.pangolinInfos.age : 0;
  }

  showFamily() : string {
    return this.pangolinInfos && this.pangolinInfos.family ? this.pangolinInfos.family : "No family";
  }

  showRace() : string {
    return this.pangolinInfos && this.pangolinInfos.race ? this.pangolinInfos.race : "No race";
  }

  showFood() : string {
    return this.pangolinInfos && this.pangolinInfos.food ? this.pangolinInfos.food : "No food";
  }

  modify() {
    this.modification = true;
  }

  backToInfos() : void {
    this.modification = false;
  }

  modifyInfos() :void {
    const pangolinData = this.pangolinInfosForm.getRawValue(); 
    this.pangolinService.setInfos({
      age : pangolinData.age,
      family : pangolinData.family,
      race : pangolinData.race,
      food : pangolinData.food
    }).subscribe(res => {
        console.log(res);
        this.router.navigate['/infos'];
    });
  }


}
