import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { ModelsComponent } from './models/models.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


// define a route array as an instance of Routes and declare the endpoints on the components
const routeConfig: Routes = [  
  {
    path: 'dashboard',
    component: ModelsComponent,
    title: 'Home page'
  },
  {
    path: '',
    component: UserComponent,
    title: 'Login page',
    children: [{
      path: "",
      component: ModelsComponent
    }]
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    title: 'User Registration page',
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
  },
  { path: '**',
    component: PageNotFoundComponent, // should always be the last route in the list
    title: 'Error Page'
  }
];


export default routeConfig;
