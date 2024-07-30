import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login.service';
import { EmptyError } from 'rxjs';
import { DatePipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-expense-input',
  standalone: true,
  imports: [FormsModule, RouterLink, NgFor],
  templateUrl: './expense-input.component.html',
  styleUrl: './expense-input.component.css'
})


export class ExpenseInputComponent {
  constructor(private service:LoginService, private router:Router){}
  object = {
    item_name: '',
    amount: 0.00,
    category: '',
    date_incurred: 0,
    description: ''
  };
  public perror: string = ""
  public categry: any

  ngOnInit(){
    this.getCategory()
  }
  expenseInput(){
    try{
      if (this.object.amount <= 0 || this.object.category==''){
        this.perror = "invalid fields"
        this.perror
      }
    }
    catch{
      console.error("invalid fields");
      EmptyError
    }

    this.service.expenseEntry(this.object).subscribe(()=>{
      this.router.navigateByUrl("/exp/more")
    }),
    (error: any) => {
      // Handle login error
      alert("Income entry failed")
      console.error('Income input failed', error);
    }
  }

  getCategory(){
    this.service.getCategory().subscribe((res:any)=>{
      console.log(res);
      this.categry=res.results
      this.categry
      
    }),
    (error: any) => {
      // Handle login error
      alert("Income entry failed")
      console.error('Income input failed', error);
    }
  }
}