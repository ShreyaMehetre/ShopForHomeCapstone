import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleReportGenerateComponent } from './sale-report-generate.component';

describe('SaleReportGenerateComponent', () => {
  let component: SaleReportGenerateComponent;
  let fixture: ComponentFixture<SaleReportGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleReportGenerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleReportGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
