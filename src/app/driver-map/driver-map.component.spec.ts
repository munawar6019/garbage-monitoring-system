import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverMapComponent } from './driver-map.component';

describe('DriverMapComponent', () => {
  let component: DriverMapComponent;
  let fixture: ComponentFixture<DriverMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
