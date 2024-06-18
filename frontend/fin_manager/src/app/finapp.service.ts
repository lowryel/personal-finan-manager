import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinappService {
  private baseUrl:string = "http://127.0.0.1:8000/apiv1/inc/"

  constructor( private http: HttpClient ) { }
  // get all incomes
  getIncome(): Observable<any>{
    return this.http.get(this.baseUrl)
  }
}
