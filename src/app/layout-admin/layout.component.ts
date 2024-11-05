import { Component } from '@angular/core';
import { UserstorageService } from '../auth/service/storage/userstorage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'hotelWeb';
  
  isCustomerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Cập nhật trạng thái khi ứng dụng khởi động
    // this.isCustomerLoggedIn = UserstorageService.isCustomerLoggedIn();
    this.isAdminLoggedIn = UserstorageService.isAdminLoggedIn();

    // Lắng nghe sự kiện thay đổi route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.isCustomerLoggedIn = UserstorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserstorageService.isAdminLoggedIn();
      }
    });
  }

  logout() {
    UserstorageService.signOut();
    this.router.navigateByUrl('/control');
  }
}
