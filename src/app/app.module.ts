import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ClientComponent } from './client/client.component';
import { FooterComponent } from './client/footer/footer.component';
import { HeaderComponent } from './client/header/header.component';
import { LayoutComponent } from './layout-admin/layout.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { PagesComponent } from './pages/pages.component';
import { RoomComponent } from './pages/list-products/components/room/room.component';
import { DetailRoomComponent } from './pages/list-products/components/book-room/detail-room.component';
import { DetailComponent } from './pages/list-products/components/detail-room/detail/detail.component';
import { RoomSearchComponent } from './pages/list-products/components/room-search/room-search.component';
import { UserComponent } from './modules/user/user.component';
import { EditComponent } from './modules/user/edit/edit.component';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ClientComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    ListProductsComponent,
    PagesComponent,
    RoomComponent,
    DetailRoomComponent,
    DetailComponent,
    RoomSearchComponent,
    UserComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
