import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-post-room',
  templateUrl: './post-room.component.html',
  styleUrls: ['./post-room.component.scss']
})
export class PostRoomComponent {
roomDetailForm!: FormGroup;

  constructor(private fb:FormBuilder,
              private router :Router,
              private adminService: AdminService
          ){

  this.roomDetailForm = this .fb.group({
    name:['',Validators.required],
    type:['',Validators.required],
    price:['',Validators.required],

  })
  }
  onSubmitForm() {
    if (this.roomDetailForm.valid) {
      console.log(this.roomDetailForm.value); // Kiểm tra dữ liệu form
      this.adminService.postRoomDetail(this.roomDetailForm.value).subscribe(
        res => {
          alert("Room Posted Successfully");
          this.router.navigateByUrl('/admin/dashboard');
        },
        error => {
          console.error('Lỗi từ server:', error);
          alert('Lỗi: ' + error.error);
        }
      );
    } else {
      alert('Form không hợp lệ. Vui lòng kiểm tra lại.');
    }
  }
  
}