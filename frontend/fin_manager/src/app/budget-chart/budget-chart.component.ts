import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  imports: [],
  templateUrl: './budget-chart.component.html',
  styleUrl: './budget-chart.component.css'
})
export class BudgetChartComponent {
  constructor(private income:LoginService, private expense: LoginService) {}

  public incchart: any;
  public expchart: any;
  public budchart: any;

  ngOnInit(): void{
    this.budgetChart()
  }


  async budgetChart() {
    const incomeChartData = await this.getIncomeData();
    const expenseChartData = await this.getExpenseData();
    
    this.budchart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: incomeChartData.labels,
        datasets: [{
          label: 'Income',
          data: incomeChartData.data,
          backgroundColor: 'blue'
        },
        {
          label: 'Expense',
          data: expenseChartData.data,
          backgroundColor: 'red'
        },
      ]
      },
      options: {
        aspectRatio: 0.0,
        responsive: true

      },
    });
  }

  private async getIncomeData(): Promise<{labels: string[], data: number[]}> {
    return new Promise((resolve, reject) => {
      this.income.getMonthlyTotalIncome().subscribe({
        next: (res: any) => {
          const labels = res.results.map((item:any) => item.date);
          const data = res.results.map((item:any) => item.total_amount);
          resolve({ labels, data });
        },
        error: (error: any) => reject(error)
      });
    });
  }

  private async getExpenseData(): Promise<{labels: string[], data: number[]}> {
    return new Promise((resolve, reject) => {
      this.expense.getMonthlyTotalExpense().subscribe({
        next: (res: any) => {
          const labels = res.results.map((item:any) => item.date);
          const data = res.results.map((item:any) => item.total_amount);
          resolve({ labels, data });
        },
        error: (error: any) => reject(error)
      });
    });
  }



}
