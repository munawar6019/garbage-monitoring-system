import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DouhgnutChartComponent } from './douhgnut-chart.component';

describe('DouhgnutChartComponent', () => {
  let component: DouhgnutChartComponent;
  let fixture: ComponentFixture<DouhgnutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DouhgnutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DouhgnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
