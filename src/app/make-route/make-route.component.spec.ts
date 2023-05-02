import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRouteComponent } from './make-route.component';

describe('MakeRouteComponent', () => {
  let component: MakeRouteComponent;
  let fixture: ComponentFixture<MakeRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
