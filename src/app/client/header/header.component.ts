import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserstorageService } from 'src/app/auth/service/storage/userstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCustomerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  cartItems: number = 0;
  searchForm = new FormGroup({
    keyword: new FormControl(''),
  });

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItemsCount$.subscribe(count => {
      this.cartItems = count;
    });
    // Lắng nghe sự kiện thay đổi route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCustomerLoggedIn = UserstorageService.isCustomerLoggedIn();

      }
    });
  }

  onSubmit(): void {
    const query = this.searchForm.controls.keyword.value;
    // Chuyển hướng đến trang search-results với từ khóa tìm kiếm
    this.router.navigate(['/search'], { queryParams: { keyword: query } });
  }
  
  logout() {
    UserstorageService.signOut();
    this.router.navigateByUrl('/control');
  }
}
