import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserstorageService } from 'src/app/auth/service/storage/userstorage.service';

const  BASIC_URL = 'http://localhost:8080/hotel/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
    constructor(private http: HttpClient) {}
    postRoomDetail (roomDto: any): Observable<any>{
      return this.http.post(BASIC_URL+"api/admin/room",roomDto,{
      headers : this.createAuthorizationHeader(),
    })
  }
      getRooms (pageNumber: number): Observable<any>{
      return this.http.get(BASIC_URL+`api/admin/rooms/${pageNumber}`,{
      headers : this.createAuthorizationHeader(),
    })
  }
  getRoomById(id: number ):Observable<any>{
    return this.http.get(BASIC_URL+`api/admin/room/${id}`,{
      headers : this.createAuthorizationHeader(),
    })
  }
  updateRoomDetail(id: number,roomDto:any ):Observable<any>{
    return this.http.put(BASIC_URL+`api/admin/room/${id}`,roomDto,{
      headers : this.createAuthorizationHeader(),
    })
  }
  deleteRoom(roomId: number ):Observable<any>{
    return this.http.delete(BASIC_URL+`api/admin/room/${roomId}`,{
      headers : this.createAuthorizationHeader(),
    })
  }
    getReservations (pageNumber: number): Observable<any>{
      return this.http.get(BASIC_URL+`api/admin/reservations/${pageNumber}`,{
      headers : this.createAuthorizationHeader(),
    })
  }

  changeReservationStatus(reservationId:number,status:string): Observable<any>{
        return this.http.get(BASIC_URL+`api/admin/reservation/${reservationId}/${status}`,{
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
  ListUsers(page: number, size: number, name: string, dbType: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('name', name)
      .set('dbType', dbType);
  
    return this.http.get<any>(BASIC_URL + `api/auth`, {
      headers: this.createAuthorizationHeader(),
      params: params 
    });
  }
  getUserById(id: number ):Observable<any>{
    return this.http.get(BASIC_URL+`api/auth/user/${id}`,{
      headers : this.createAuthorizationHeader(),
    })
  }
  updateUser(id: number,userDto:any ):Observable<any>{
    return this.http.put(BASIC_URL+`api/auth/user/${id}`,userDto,{
      headers : this.createAuthorizationHeader(),
    })
  }
  deleteUser(userId: number ):Observable<any>{
    return this.http.delete(BASIC_URL+`api/auth/user/${userId}`,{
      headers : this.createAuthorizationHeader(),
    })
  }
}
