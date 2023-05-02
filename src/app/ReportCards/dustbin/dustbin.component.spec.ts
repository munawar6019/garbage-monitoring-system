import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DustbinComponent } from './dustbin.component';

describe('DustbinComponent', () => {
  let component: DustbinComponent;
  let fixture: ComponentFixture<DustbinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DustbinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DustbinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
