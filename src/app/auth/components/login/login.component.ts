import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { UserstorageService } from '../../service/storage/userstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {};
  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(res => {
      // this.router.navigate(['/']);
      // console.log(res);  
      if(res.userId!= null){
        const user = {
          id : res.userId,
          role: res.userRole
        }
        UserstorageService.saveUser(user);
        UserstorageService.saveToken(res.jwt);

        if(UserstorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('/admin/dashboard');
        }
        else if(UserstorageService.isCustomerLoggedIn())
        { 
          this.router.navigateByUrl('/customer/room')
        }
      }
    });
  }
}