import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { ModelsComponent } from './models/models.component';


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
  }
];


export default routeConfig;
