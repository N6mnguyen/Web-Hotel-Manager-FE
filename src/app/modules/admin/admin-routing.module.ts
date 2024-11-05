import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostRoomComponent } from './components/post-room/post-room.component';
import { UpdateRoomComponent } from './components/update-room/update-room.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { UserComponent } from '../user/user.component';
import { EditComponent } from '../user/edit/edit.component';
import { BinhLuanComponent } from './components/binh-luan/binh-luan.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'room', component: PostRoomComponent },
  { path: 'room/:id/edit', component: UpdateRoomComponent},
  { path: 'reservations', component: ReservationsComponent},
  { path: 'user', component: UserComponent}, 
  { path: 'user/:id/edit', component:EditComponent},
  { path: 'binhluan', component:BinhLuanComponent}




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
