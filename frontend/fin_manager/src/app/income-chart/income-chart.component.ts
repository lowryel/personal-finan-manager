import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { LoginService } from '../login.service';
import { registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-income-chart',
  standalone: true,
  imports: [],
  templateUrl: './income-chart.component.html',
  styleUrl: './income-chart.component.css'
})
export class IncomeChartComponent implements OnInit {
  // @ViewChild('myChart')
  // 

  ngOnInit(): void{
    this.loadIncome()
    this.incomeChart();
  }


  public incchart: any;

  public allIncome:any;
  constructor(private income:LoginService) {}

  errorMessage: string = '';

  // get all income 
  loadIncome() {
    this.income.getIncome().subscribe((res:any)=>{
      console.log(res["results"]);
      for (let i = 0; i < res["results"].length; i++) {
        console.log(res["results"][i].amount)
      }
      this.allIncome = res["results"]
      this.allIncome
      console.log(`Current Total Income: ${this.allIncome}`);
      (error: { message: string; })=>{
        this.errorMessage = error.message
      }
    })
  }

  async incomeChart() {
    const chartData = await this.getIncomeData();
    
    this.incchart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Income',
          data: chartData.data,
          backgroundColor: 'blue'
        }]
      },
      options: {
        aspectRatio: 0.0,
        responsive: true
      }
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

}
