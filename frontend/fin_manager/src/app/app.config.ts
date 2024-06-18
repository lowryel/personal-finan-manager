import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { loginInterceptor } from './login.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


import routeConfig from '../app/route';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig), HttpClientModule, provideHttpClient(withFetch()), {
      provide: [HTTP_INTERCEPTORS, JWT_OPTIONS],
      useClass: loginInterceptor,
      multi: true
    }, JwtModule, JwtHelperService]
};
