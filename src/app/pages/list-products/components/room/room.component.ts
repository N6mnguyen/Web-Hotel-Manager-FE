import { Component } from '@angular/core';
import { UserstorageService } from 'src/app/auth/service/storage/userstorage.service';
import { ProductsService } from '../../service/products.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/client/cart.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  currentPage = 1; 
  rooms = [];  
  total: number = 0;  
  loading = false;  
  cartItems = 0; 

  isVisibleMiddle = false;  
  checkInDate: string;  
  checkOutDate: string;  
  id: number;  

  constructor(  private productsService: ProductsService,
                private cartService: CartService,
                private router: Router
  ) {
    this.getRooms();  
  }

  getRooms() {
    this.loading = true;  
    this.productsService.getRooms(this.currentPage - 1).subscribe(res => {
      this.rooms = res.roomDtoList;  
      this.total = res.totalPages;  
      this.loading = false;  
    }, error => {
      this.loading = false;  
      console.error('Error fetching rooms:', error);
    });
  }

  // Khi thay đổi ngày nhận và trả phòng
  onChange() {
    if (this.checkInDate && this.checkOutDate) {
      const formattedCheckIn = this.formatDate(this.checkInDate);
      const formattedCheckOut = this.formatDate(this.checkOutDate);

      console.log('Ngày nhận phòng:', formattedCheckIn); // in ra để kiểm tra
      console.log('Ngày trả phòng:', formattedCheckOut); // in ra để kiểm tra

      // Cập nhật lại checkInDate và checkOutDate nếu cần
      this.checkInDate = formattedCheckIn;
      this.checkOutDate = formattedCheckOut;
    }
  }

  // Hàm để chuyển đổi định dạng ngày
  formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-'); // Đối với input type="date", nó trả về định dạng yyyy-mm-dd
    return `${year}-${day}-${month}`; // Trả về định dạng yyyy-dd-mm
  }

  handleCancelMiddle() {
    this.isVisibleMiddle = false;
  }

  handleOkMidlle(): void {
    const bookingObj = {
      userId: UserstorageService.getUserId(),
      roomId: this.id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };

    this.productsService.bookRoom(bookingObj).subscribe(res => {
      alert("Yêu cầu đặt phòng đã được gửi để duyệt!");
      this.isVisibleMiddle = false;
    }, error => {
      console.error('Lỗi khi đặt phòng:', error);
      alert('Lỗi: ' + error.message);
    });
  }

  showModalMiddle(id: number) {
    this.id = id;
    this.isVisibleMiddle = true;
  }

  nextPage() {
    //trang hiển tại chưa đến trang cuối thì hiện tại + 1 
    if (this.currentPage < this.total) {
      this.currentPage++;
      this.getRooms();
    }
  }

  // Move to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRooms();
    }
  }  
  
  placeOrder() {
    // Thực hiện logic đặt hàng của bạn ở đây...

    // Sau khi đặt hàng thành công, đặt lại số lượng giỏ hàng về 1
    this.cartService.placeOrder();
  }
}
