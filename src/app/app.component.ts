import { Component } from '@angular/core';
import { UserstorageService } from './auth/service/storage/userstorage.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotelWeb';
}
