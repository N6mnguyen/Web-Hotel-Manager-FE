import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserstorageService } from 'src/app/auth/service/storage/userstorage.service';
const  BASIC_URL = 'http://localhost:8080/hotel/';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
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
  // Search_Product = (name: string, pageNumber: number): Observable<any> => {
  //   return this.http.get(BASIC_URL + `api/customer/rooms/${pageNumber}?name_like=${name}`);
  // };
  getRoomById(id: number ):Observable<any>{
    return this.http.get(BASIC_URL+`api/customer/room/${id}`,{
      headers : this.createAuthorizationHeader(),
    });
  } 
    private apiUrl = 'http://localhost:8080/hotel/api/customer/search'; // Đường dẫn API
    // Phương thức tìm kiếm phòng với tên, số trang và kích thước trang
    searchRooms(name: string, page: number, size: number): Observable<any> {
      let params = new HttpParams()
        .set('name', name)
        .set('page', page.toString())
        .set('size', size.toString());
    
      return this.http.get<any>(this.apiUrl, { 
        params, 
        headers: this.createAuthorizationHeader() // Thêm header vào yêu cầu
      });
    }
  //commnet
  private baseUrl = 'http://localhost:8080/hotel/api/comments';

  getCommentsByRoomId(roomId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/room/${roomId}`,{
      headers : this.createAuthorizationHeader(),
    });
  }

  addComment(roomId: number, content: string): Observable<Comment> {
      const commentData = { content }; // Nếu server yêu cầu một đối tượng chứa content
      return this.http.post<Comment>(`${this.baseUrl}/room/${roomId}`, commentData, {
        headers: this.createAuthorizationHeader(), // Nếu cần token
    });
  } 
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${commentId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }  
}

