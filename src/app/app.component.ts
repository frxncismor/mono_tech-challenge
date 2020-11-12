import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tech-challenge';

  ngOnInit(): void {
    localStorage.setItem('auth_token', environment.API_KEY);
  }
}
