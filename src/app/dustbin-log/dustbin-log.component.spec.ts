import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DustbinLogComponent } from './dustbin-log.component';

describe('DustbinLogComponent', () => {
  let component: DustbinLogComponent;
  let fixture: ComponentFixture<DustbinLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DustbinLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DustbinLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
