import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  navBarStatus : boolean = true;
  buttonOffset : number = Math.floor(window.screen.width * 0.085);
  screenOffset : number = Math.floor(window.screen.width * 0.085);

  title = 'PSN (for Pangolin Social Network)';

  switchMenu() : void {
    this.navBarStatus = !this.navBarStatus;
    this.buttonOffset = this.buttonOffset === 0 ? this.screenOffset : 0;
  }
}
