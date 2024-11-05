import { Component, OnInit } from '@angular/core'; // Thêm OnInit
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { UserstorageService } from '../../service/storage/userstorage.service';
import { ProductsService } from 'src/app/pages/list-products/service/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { // Implement OnInit
  loginForm!: FormGroup;
  loginError: string = ''; // Biến để lưu thông báo lỗi
  rooms = [];  
  total: number = 0;  
  loading = false;  
  currentPage = 1; // Đảm bảo có giá trị cho currentPage

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Gọi getRooms khi khởi tạo component
    this.getRooms();
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole,
          };
          UserstorageService.saveUser(user);
          UserstorageService.saveToken(res.jwt);

          if (UserstorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('/control/admin/dashboard');
          } else if (UserstorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('/');
          }
          // Không cần gọi getRooms ở đây nữa
        }
      },
      error: (error) => {
        // Xử lý lỗi đăng nhập, ví dụ như thông báo "Sai mật khẩu"
        this.loginError = 'Sai tên đăng nhập hoặc mật khẩu';
      },
    });
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
}
