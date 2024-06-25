import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-income-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './income-details.component.html',
  styleUrl: './income-details.component.css'
})
export class IncomeDetailsComponent {
  public allIncome:any;
  constructor(private income:LoginService) { }
  ngOnInit() {
    this.loadIncome()
  }

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
    })
  }
  deleteIncome(income_id:string){
    console.log(income_id);
    
    this.income.deleteIncome(income_id).subscribe((res:any) => {
      console.log("Delete response expected: ", res);
        // Remove the deleted income from the local array
        this.allIncome = this.allIncome.filter((income:any) => income.id !== income_id);
    })
,
    (error: any) => {
      console.error('Error deleting income:', error);
    }
  }
}
