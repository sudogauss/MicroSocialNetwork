import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    let response = await this.http.post("http://localhost:8080/api/auth/signup", {username : "ab", password: "ba"});
    console.log("There");
    response.subscribe(v => console.log(v));
  }

}
