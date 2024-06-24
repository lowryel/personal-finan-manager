import { Component, Inject, input, Input, OnInit, output } from '@angular/core';
import { FinappService } from '../finapp.service';
import { IncomeObject } from '../income';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css'
})

export class ModelsComponent implements OnInit {
  public allIncome:number=0;
  public allExpenses:number=0;
  public totalBudget:number=0;

  constructor(private login: LoginService) { }

  budget:number = 10;
  ngOnInit(): void {
    this.budgetPosition()
    this.loadIncome()
    this.loadExpenditure()
    this.loadBudget()
  }

  budgetPosition() {
    let budget:any = document.getElementById('budget')
    if ( this.budget <0 ) {
      budget.style.color = 'red';
    }else{
      budget.style.color = 'green'
    }
  }

  @Input() income: number=0;
  
  // load all incomes
  loadIncome() {
    this.login.getIncome().subscribe((res:any)=>{
      console.log(typeof(res["results"]));
      for (let i = 0; i < res["results"].length; i++) {
        
        this.allIncome += parseFloat(res["results"][i].amount);
        // console.log(`Index: ${i}, Object: `, res[i]["results"].amount);
        this.allIncome
        }
      console.log(`Current Total Income: ${this.allIncome}`);
    })
  }


  // load all incomes
  loadExpenditure() {
    this.login.getExpenditure().subscribe((res:any)=>{
      console.log(typeof(res["results"]));
      for (let i = 0; i < res["results"].length; i++) {
        
        this.allExpenses += parseFloat(res["results"][i].amount);
        this.allExpenses = parseFloat(this.allExpenses.toFixed(2));
        }
      console.log(`Current Total Expenses: ${this.allExpenses}`);
    })
  }


  // load all incomes
  loadBudget() {
    this.login.getBudget().subscribe((res:any)=>{
      console.log((res["results"]));
      this.totalBudget += parseFloat(res["results"][0].total_budget)
      console.log(`Current Total Budget: ${this.totalBudget}`);
    })
  }

}
