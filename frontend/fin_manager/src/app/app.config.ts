import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loginInterceptor } from './login.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


import routeConfig from '../app/route';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig),
    importProvidersFrom(FormsModule),
    provideHttpClient(withInterceptors([loginInterceptor])),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, provideAnimationsAsync()
  ]
};