import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss']
})
export class UpdateRoomComponent {
  updateRoomForm!: FormGroup;
  id = this.activatedroute.snapshot.params['id'];
  constructor(private fb:FormBuilder,
              private router :Router,
              private adminService: AdminService,
              private activatedroute : ActivatedRoute,
          ){

  this.updateRoomForm = this .fb.group({
    name:['',Validators.required],
    type:['',Validators.required],
    price:['',Validators.required],
    });
    this.getRoomById();
  }
  onSubmitForm(){
    this.adminService.updateRoomDetail(this.id,this.updateRoomForm.value).subscribe(res=>{
        alert('Room upadated successfully');
        this.router.navigateByUrl("/admin/dashboard");
    },error=>{
      alert(error.error)
    });
  }
  getRoomById(){
    this.adminService.getRoomById(this.id).subscribe(res=>{
      this.updateRoomForm.patchValue(res);
    },error=>{
      alert(error.error);
    })
  }
}
