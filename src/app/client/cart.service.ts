import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  count = 0;
  private cartItemsCountSource = new BehaviorSubject<number>(0); // Khởi tạo với 0
  cartItemsCount$ = this.cartItemsCountSource.asObservable(); // Observable để theo dõi số lượng giỏ hàng

  placeOrder() {
    this.cartItemsCountSource.next(this.count++); // Đặt lại số lượng giỏ hàng về 1 khi đặt hàng
  }
}
