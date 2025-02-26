import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDeactivateComponent } from './coupon-deactivate.component';

describe('CouponDeactivateComponent', () => {
  let component: CouponDeactivateComponent;
  let fixture: ComponentFixture<CouponDeactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponDeactivateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
