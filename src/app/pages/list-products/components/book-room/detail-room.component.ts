import { Component } from '@angular/core';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.scss']
})
export class DetailRoomComponent {
    currentPage: number = 1;
    total:any;
    bookings: any;
    constructor(private productsService: ProductsService) {
      this.getBooking();
    }
  
    getBooking(): void {
      this.productsService.getMyBookings(this.currentPage - 1).subscribe(
        res => {
          console.log(res);
          this.bookings = res.reservationDtoList;
          this.total=res.totalPages
        },
        err => {
          console.log(err.error);
        }
      );
    }
    pageIndexChange(value: number): void {
      this.currentPage = value;
      this.getBooking();
    }
}
