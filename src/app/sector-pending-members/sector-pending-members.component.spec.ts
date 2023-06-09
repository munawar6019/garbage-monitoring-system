import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorPendingMembersComponent } from './sector-pending-members.component';

describe('SectorPendingMembersComponent', () => {
  let component: SectorPendingMembersComponent;
  let fixture: ComponentFixture<SectorPendingMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorPendingMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorPendingMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
