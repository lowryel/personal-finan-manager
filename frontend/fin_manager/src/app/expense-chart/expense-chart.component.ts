import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [],
  templateUrl: './expense-chart.component.html',
  styleUrl: './expense-chart.component.css'
})
export class ExpenseChartComponent implements OnInit {

  constructor(private expense: LoginService){}

  ngOnInit(){
    this.expenseChart()
  }

  // ngOnDestroy(): void{
  //   if(this.expchart){
  //     this.expchart.destroy();
  //   }
  // }


  public expchart: any;

  async expenseChart() {
    const chartData = await this.getExpenseData();
    
    this.expchart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Expense',
          data: chartData.data,
          backgroundColor: 'red'
        }]
      },
      options: {
        aspectRatio: 0.0,
        responsive: true
      }
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


