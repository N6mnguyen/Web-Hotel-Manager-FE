import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinhLuanComponent } from './binh-luan.component';

describe('BinhLuanComponent', () => {
  let component: BinhLuanComponent;
  let fixture: ComponentFixture<BinhLuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BinhLuanComponent]
    });
    fixture = TestBed.createComponent(BinhLuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
