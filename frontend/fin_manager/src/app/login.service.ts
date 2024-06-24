import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { map, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000'; // Replace with your Django API URL

  constructor(private http: HttpClient) {}

  currentUser = signal<User | undefined | null>(undefined);

  loginApp(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/apiv1/user/token/`, credentials).pipe(
      tap((response: any) => {
        // Store the JWT token in local storage or another secure storage
          if (response && response.token) {
            localStorage.setItem('token', response.access);
          }
          console.log("new Response", response);
          
        // You may also want to store the refresh token if provided
        // localStorage.setItem('refreshToken', response.refresh);
        return response;
      })
    );

    }
  // get all incomes
  getIncome(): Observable<any>{
    return this.http.get(`${this.apiUrl}/apiv1/inc/`)
  }

  // get all incomes
  getExpenditure(): Observable<any>{
    return this.http.get(`${this.apiUrl}/apiv1/exp/`)
  }

  // get all incomes
  getBudget(): Observable<any>{
    return this.http.get(`${this.apiUrl}/apiv1/bud/`)
  }

  logout() {
    // Remove the JWT token from storage
    localStorage.removeItem('token');
    // Remove the refresh token if stored
    // localStorage.removeItem('refreshToken');
  }

  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check if the token is valid and not expired
  //   // return token !== null && !this.jwtHelper.isTokenExpired(token);
  // }
}
