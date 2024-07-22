import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { NgFor } from '@angular/common';

import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-expense-details',
  standalone: true,
  imports: [NgFor, MatTableModule],
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
  deleteExpense(expense_id:string){
    console.log(expense_id);
    this.login.deleteExpense(expense_id).subscribe(() => {
      this.allExpense = this.allExpense.filter((item:any) => item.id !== expense_id);
      location.reload() // Remove the deleted income from the local array on DOM reload
    }),
    (error: any) => {
      console.error('Error deleting income:', error);
    }
  }
}
