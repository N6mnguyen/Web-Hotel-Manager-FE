import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    currentPage = 1;  // Start on the first page
    rooms = [];
    total: number = 0;  // Total number of pages
    loading = false;

    constructor(private adminService: AdminService) {
      this.getRooms();
    }

    // Fetch the rooms based on the current page
    getRooms() {
      this.loading = true;  // Set loading state
      this.adminService.getRooms(this.currentPage - 1).subscribe(res => {
        this.rooms = res.roomDtoList;  // Update the room list
        this.total = res.totalPages;  // Total pages
        this.loading = false;  // Clear loading state
      }, error => {
        this.loading = false;  // Clear loading on error
        console.error('Error fetching rooms:', error);
      });
    }
    deleteRoom(roomId:number){
      try{
        this.adminService.deleteRoom(roomId).subscribe(()=>{
          const confirm = window.confirm('Bạn có chắc chắn muốn xóa không ?');
          if(confirm)
          {
            alert('Xóa thành công !');
            this.getRooms();
          }
        });
      } catch (error) {}
    }
    // Move to the next page
    nextPage() {
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

    // To handle page number click
    goToPage(page: number) {
      if (page >= 1 && page <= this.total) {
        this.currentPage = page;
        this.getRooms();
      }
    }
}
