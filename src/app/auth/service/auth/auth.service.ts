import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASIC_URL = 'http://localhost:8080/hotel/';

  constructor(private http: HttpClient) {}

  register(signupRequset: any): Observable<any> {
    return this.http.post(this.BASIC_URL+"api/auth/signup", signupRequset);
  }

  login(loginRequset: any): Observable<any> {
    return this.http.post(this.BASIC_URL+"api/auth/login", loginRequset).pipe(catchError(error=>{
      return error;
    }));
  }
}
