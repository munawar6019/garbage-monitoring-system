import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilledDustbinsComponent } from './filled-dustbins.component';

describe('FilledDustbinsComponent', () => {
  let component: FilledDustbinsComponent;
  let fixture: ComponentFixture<FilledDustbinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilledDustbinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilledDustbinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
