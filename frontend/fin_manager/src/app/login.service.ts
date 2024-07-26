import { ErrorHandler, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { catchError, Observable, tap, throwError } from 'rxjs';

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
        localStorage.setItem('refreshToken', response.refresh);
        return response;
      }),
      catchError(this.handleError)
    );
  }


  registerUser(credentials: { username: string; email: string, password1: string; password2: string }): Observable<any> {
    console.log("registering a new user");
    return this.http.post(`${this.apiUrl}/dj-rest-auth/registration/`, credentials)
  }


  // get all incomings for the month
  getIncome(): Observable<any>{
    return this.http.get(`${this.apiUrl}/apiv1/inc/`).pipe(
      tap(res=>{
        res
      }),
      catchError(this.handleError)
    )
  }

  // get all incomings for the month
  getMonthlyTotalIncome(): Observable<any>{
    return this.http.get(`${this.apiUrl}/apiv1/monthly_income/`).pipe(
      tap(res=>{
        res
      }),
      catchError(this.handleError)
    )
  }





  // delete income
  deleteIncome(income_id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/apiv1/income.updelete/${income_id}`).pipe(
      tap(res=>{
        res
      }),
      catchError(this.handleError)
    )
  }

  
  // get all expenses for the month
  getExpenditure(): Observable<any>{
    return this.http.get(`${this.apiUrl}/apiv1/exp/`).pipe(
      tap(res=>{
        res
      }),
      catchError(this.handleError)
    )
  }

  // get all expenses for the month
  getMonthlyTotalExpense(): Observable<any>{
    return this.http.get(`${this.apiUrl}/apiv1/monthly_expense/`).pipe(
      tap(res=>{
        res
      }),
      catchError(this.handleError)
    )
  }




  // NEW: delete expense
  deleteExpense(expense_id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/apiv1/expense.updelete/${expense_id}`).pipe(
      tap(res=>{
        res
      }),
      catchError(this.handleError)
    )
  }


  // get budget for the month
  getBudget(): Observable<any>{
    return this.http.get(`${this.apiUrl}/apiv1/bud/`).pipe(
      tap(res=>{
        res
      }),
      catchError(this.handleError)
    )
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

    private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
