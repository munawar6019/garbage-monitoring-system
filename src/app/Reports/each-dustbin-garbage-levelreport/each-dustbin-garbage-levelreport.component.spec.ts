import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachDustbinGarbageLevelreportComponent } from './each-dustbin-garbage-levelreport.component';

describe('EachDustbinGarbageLevelreportComponent', () => {
  let component: EachDustbinGarbageLevelreportComponent;
  let fixture: ComponentFixture<EachDustbinGarbageLevelreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachDustbinGarbageLevelreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachDustbinGarbageLevelreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
