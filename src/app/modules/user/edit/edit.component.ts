import { Component } from '@angular/core';
import { AdminService } from '../../admin/admin-service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  updateUserForm!: FormGroup;
  id = this.activatedroute.snapshot.params['id'];
  constructor(private fb:FormBuilder,
              private router :Router,
              private adminService: AdminService,
              private activatedroute : ActivatedRoute,
          ){

  this.updateUserForm = this .fb.group({
    name:['',Validators.required],
    email:['',Validators.required],
    });
    this.getUserById();
  }
  onSubmitForm(){
    this.adminService.updateUser(this.id,this.updateUserForm.value).subscribe(res=>{
        alert('Room upadated successfully');
        this.router.navigateByUrl("/control/admin/user");
    },error=>{
      alert(error.error)
    });
  }
  getUserById(){
    this.adminService.getUserById(this.id).subscribe(res=>{
      this.updateUserForm.patchValue(res);
    },error=>{
      alert(error.error);
    })
  }
}
