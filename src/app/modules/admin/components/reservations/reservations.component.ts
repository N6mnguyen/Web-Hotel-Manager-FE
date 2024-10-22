import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';  // Đảm bảo bạn có interface cho ReservationDto

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent {
  currentPage: number = 1;
  total: number = 0;
  reservations: any;  // Khởi tạo reservations là mảng rỗng

  constructor(private adminService: AdminService) {
    this.getReservations();
  }

  getReservations(): void {
    this.adminService.getReservations(this.currentPage - 1).subscribe(
      res => {
        console.log(res);
        this.reservations = res.reservationDtoList        ;  // Gán mảng rỗng nếu không có dữ liệu
        this.total = res.totalPages * 5;
      },
      err => {
        console.error('Error fetching reservations:', err);
        this.reservations = [];  // Gán mảng rỗng trong trường hợp lỗi
      }
    );
  }

  pageIndexChange(value: number): void {
    this.currentPage = value;
    this.getReservations();
  }
  changeReservationStatus(bookingId:number, status:string ){
    this.adminService.changeReservationStatus(bookingId,status).subscribe(res=>{
        alert('Reservation status updated successfully');
        this.getReservations();
    },error=>{
      console.log(error.err);
    }
    )
  }
}
