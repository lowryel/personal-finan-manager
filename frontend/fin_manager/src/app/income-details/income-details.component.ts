import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { LoginService } from '../login.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { IncomeChartComponent } from '../income-chart/income-chart.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-income-details',
  standalone: true,
  imports: [
    NgFor, FormsModule, CommonModule, 
    MatTableModule, MatPaginatorModule, 
    MatButtonModule, IncomeChartComponent,
    RouterLink,
  ],
  templateUrl: './income-details.component.html',
  styleUrl: './income-details.component.css'
})

export class IncomeDetailsComponent {
  public allIncome:any;
  public incchart:any;
  constructor(private income:LoginService, private cd: ChangeDetectorRef) { }
  ngOnInit() {
    this.loadIncome()
  }

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

  deleteIncome(income_id:string){
    console.log(income_id);
    this.income.deleteIncome(income_id).subscribe(() => {
      this.allIncome = this.allIncome.filter((item:any) => item.id !== income_id);
      this.cd.detectChanges();
      location.reload()
        // Remove the deleted income from the local array
    }),
    (error: any) => {
      console.error('Error deleting income:', error);
    }
  }


}
