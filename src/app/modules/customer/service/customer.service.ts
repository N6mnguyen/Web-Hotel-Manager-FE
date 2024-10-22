import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserstorageService } from 'src/app/auth/service/storage/userstorage.service';
const  BASIC_URL = 'http://localhost:8080/hotel/';
@Injectable({
  providedIn: 'root'
})
    export class CustomerService {
      constructor(private http: HttpClient) {}
      getRooms (pageNumber: number): Observable<any>{
        return this.http.get(BASIC_URL+`api/customer/rooms/${pageNumber}`,{
        headers : this.createAuthorizationHeader(),
      })
    }
    bookRoom (bookingDto: any): Observable<any>{
      return this.http.post(BASIC_URL+`api/customer/book`,bookingDto,{
      headers : this.createAuthorizationHeader(),
    })
  }
    getMyBookings (pageNumber: number): Observable<any>{
      const userId = UserstorageService.getUserId();
      return this.http.get(BASIC_URL+`api/customer/bookings/${userId}/${pageNumber}`,{
      headers : this.createAuthorizationHeader(),
    })
  }
    createAuthorizationHeader(){
      let authHeaders: HttpHeaders = new HttpHeaders();
      return authHeaders.set(
        'Authorization',
        'Bearer ' + UserstorageService.getToken()  // Thêm khoảng trắng sau 'Bearer'
      );
    }
}
