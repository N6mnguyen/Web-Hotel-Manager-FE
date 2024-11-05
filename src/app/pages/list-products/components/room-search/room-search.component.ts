import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.scss']
})
export class RoomSearchComponent implements OnInit {
  rooms: any[] = []; // Khai báo kiểu cho sản phẩm
  keyword: string = '';
  currentPage: number = 0; // Trang hiện tại
  totalPages: number = 0; // Tổng số trang

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'] || ''; // Lấy từ khóa từ query params
      this.searchProducts(this.currentPage); // Gọi phương thức tìm kiếm
    });
  }

  searchProducts(page: number): void {
    if (this.keyword.trim() !== '') {
      this.productsService.searchRooms(this.keyword, page, 4).subscribe(data => {
        this.rooms = data.content; // Lưu dữ liệu sản phẩm
        this.totalPages = data.totalPages; // Lưu tổng số trang
      }, error => {
        console.error("Error fetching products:", error);
      });
    } else {
      this.rooms = []; 
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.searchProducts(this.currentPage); // Tìm kiếm lại với trang mới
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.goToPage(this.currentPage - 1);
    }
  }
  
}
