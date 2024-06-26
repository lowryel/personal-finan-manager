import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { ModelsComponent } from './models/models.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';


// define a route array as an instance of Routes and declare the endpoints on the components
const routeConfig: Routes = [
  {
    path: '',
    component: ModelsComponent,
    title: 'Home page'
  },
  {
    path: 'login',
    component: UserComponent,
    title: 'Login page',
    children: [{
      path: "",
      component: ModelsComponent
    }]
  },
  { path: 'inc/more',
    component: IncomeDetailsComponent,
    title: 'Income Details'
  },
  { path: 'exp/more',
    component: ExpenseDetailsComponent,
    title: 'Expenses Details'
  },
  { path: 'bud/more',
    component: BudgetDetailsComponent,
    title: 'Budget Details'
  }
];


export default routeConfig;
