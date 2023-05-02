import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRegisteredVehiclesComponent } from './total-registered-vehicles.component';

describe('TotalRegisteredVehiclesComponent', () => {
  let component: TotalRegisteredVehiclesComponent;
  let fixture: ComponentFixture<TotalRegisteredVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalRegisteredVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRegisteredVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
