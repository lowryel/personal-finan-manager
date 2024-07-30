import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { EmptyError } from 'rxjs';





@Component({
  selector: 'app-income-expense-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './income-expense-input.component.html',
  styleUrl: './income-expense-input.component.css'
})

export class IncomeExpenseInputComponent {
  constructor(private service:LoginService, private router:Router){}
  object = {
    amount: 0.00,
    source: '',
    date: '',
  };
  public perror: string = ""

  ngOnInit(){

  }
  incomeInput(){
    try{
      if (this.object.amount <= 0 || this.object.source==''){
        this.perror = "invalid fields"
        this.perror
      }
    }
    catch{
      console.error("invalid fields");
      EmptyError
    }

    this.service.incomeEntry(this.object).subscribe(()=>{
      this.router.navigateByUrl("/inc/more")
    }),
    (error: any) => {
      // Handle login error
      alert("Income entry failed")
      console.error('Income input failed', error);
    }
  }
}


