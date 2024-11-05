import { Component } from '@angular/core';
import { AdminService } from '../admin/admin-service/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users: any[] = [];
  totalUsers: number = 0; // Tổng số người dùng
  currentPage: number = 0; // Trang hiện tại
  pageSize: number = 3; // Số lượng người dùng mỗi trang
  nameFilter: string = '';
  dbType: string = ''; // Thay đổi theo nhu cầu của bạn
  Math: any;

  constructor(private userService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.ListUsers(this.currentPage, this.pageSize, this.nameFilter, this.dbType)
      .subscribe(data => {
        this.users = data.content; // Giả sử `data` trả về có thuộc tính `content`
        this.totalUsers = data.totalElements; // Tổng số người dùng
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  deleteUser(userID:number){
    try{
      this.userService.deleteUser(userID).subscribe(()=>{
        const confirm = window.confirm('Bạn có chắc chắn muốn xóa không ?');
        if(confirm)
        {
          alert('Xóa thành công !');
        }
      });
    } catch (error) {}
  }
}
