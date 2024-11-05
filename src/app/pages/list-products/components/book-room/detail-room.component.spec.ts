import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRoomComponent } from './detail-room.component';

describe('DetailRoomComponent', () => {
  let component: DetailRoomComponent;
  let fixture: ComponentFixture<DetailRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailRoomComponent]
    });
    fixture = TestBed.createComponent(DetailRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
