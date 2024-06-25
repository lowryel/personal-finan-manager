import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-expense-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './expense-details.component.html',
  styleUrl: './expense-details.component.css'
})
export class ExpenseDetailsComponent {
  public allExpense:any;
  constructor(private login:LoginService) { }
  ngOnInit() {
    console.log('IncomeDetailsComponent');
    this.loadExpense()
  }

  // get all expenses 
  loadExpense() {
    this.login.getExpenditure().subscribe((res:any)=>{
      console.log(res["results"]);
      for (let i = 0; i < res["results"].length; i++) {
        console.log(res["results"][i].amount)
      }
      this.allExpense = res["results"]
      this.allExpense
      console.log(`Current Total Expenditure: ${this.allExpense}`);
    })
  }
}
