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
  constructor(private login:LoginService) { }
  ngOnInit() {
    console.log('IncomeDetailsComponent');
    this.loadIncome()
  }

  // get all income 
  loadIncome() {
    this.login.getIncome().subscribe((res:any)=>{
      console.log(res["results"]);
      for (let i = 0; i < res["results"].length; i++) {
        console.log(res["results"][i].amount)
        }
      this.allIncome = res["results"]
      this.allIncome
      console.log(`Current Total Income: ${this.allIncome}`);
    })
  }
}
