import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseInputComponent } from './income-expense-input.component';

describe('IncomeExpenseInputComponent', () => {
  let component: IncomeExpenseInputComponent;
  let fixture: ComponentFixture<IncomeExpenseInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeExpenseInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeExpenseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
