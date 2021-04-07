import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../services/pangolin.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {

  constructor(private pangolinService : PangolinService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.pangolinService.getInfos().subscribe(res => console.log(res));
  }

}
