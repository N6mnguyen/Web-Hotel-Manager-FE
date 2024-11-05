import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  room: any;  // Khai báo biến để lưu thông tin phòng
  router = inject(ActivatedRoute);  // Inject ActivatedRoute để lấy thông tin từ route
  id = this.router.snapshot.params['id'];  // Lấy id từ route
  comments: any;  // Biến lưu bình luận
  newComment: any;  // Biến để lưu bình luận mới

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getRoomDetails();  // Gọi phương thức để lấy chi tiết phòng
    this.loadComments();  // Gọi phương thức để tải bình luận
  }

  getRoomDetails() {
    this.productsService.getRoomById(this.id).subscribe(
      (data) => {
        console.log(data);  // Log dữ liệu nhận được
        this.room = data;   // Gán dữ liệu vào biến room
      },
      (error) => {
        console.error('Error fetching room details:', error);  // Xử lý lỗi nếu có
      }
    );
  }

  // Tải bình luận cho phòng
  loadComments() {
    this.productsService.getCommentsByRoomId(this.id).subscribe(
      (data) => {
        this.comments = data;  // Gán dữ liệu bình luận vào biến comments
      },
      (error) => {
        console.error('Error fetching comments:', error);  // Xử lý lỗi nếu có
      }
    );
  }

  // Thêm bình luận mới
  addComment() {
    if (this.newComment) {
      this.productsService.addComment(this.id, this.newComment).subscribe(
        (data) => {
          this.comments.push(data);  // Thêm bình luận mới vào danh sách
          this.newComment = '';  // Reset input bình luận
        },
        (error) => {
          console.error('Error adding comment:', error);  // Xử lý lỗi nếu có
        }
      );
    }
  }
  deleteComment(roomId:number){
    try{
      this.productsService.deleteComment(roomId).subscribe(()=>{
        const confirm = window.confirm('Bạn có chắc chắn muốn xóa không ?');
        if(confirm)
        {
          alert('Xóa thành công !');
          this.loadComments();
        }
      });
    } catch (error) {}
  }
}
