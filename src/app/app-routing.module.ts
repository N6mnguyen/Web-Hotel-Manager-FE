import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ClientComponent } from './client/client.component';
import { LayoutComponent } from './layout-admin/layout.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { PagesComponent } from './pages/pages.component';
import { RoomComponent } from './pages/list-products/components/room/room.component';
import { DetailRoomComponent } from './pages/list-products/components/book-room/detail-room.component';
import { DetailComponent } from './pages/list-products/components/detail-room/detail/detail.component';
import { RoomSearchComponent } from './pages/list-products/components/room-search/room-search.component';

const routes: Routes = [
  { 
    path: 'control', 
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
      { path: 'list', component: RoomComponent},
        
    ]
  },
  {
    path: '', 
    component: PagesComponent,
    children: [
      { path: '', component: RoomComponent },
      { path: 'list', component: RoomComponent   },
      { path: 'book', component: DetailRoomComponent},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'detail/:id', component: DetailComponent },
      {path:  'search', component: RoomSearchComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
