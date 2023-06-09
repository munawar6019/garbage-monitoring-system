import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanConfirmationComponent } from './clean-confirmation.component';

describe('CleanConfirmationComponent', () => {
  let component: CleanConfirmationComponent;
  let fixture: ComponentFixture<CleanConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
