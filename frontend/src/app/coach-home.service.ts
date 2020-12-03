import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoachHomeService {
  user:string;
  errorMsg:string;
  constructor(private http:HttpClient) { }
  schedules():Observable<any>{
   this.user=localStorage.getItem("userId");
   return this.http.get("http://localhost:4000/coaches/booking/"+this.user).pipe(
     tap(res=>console.log("data fetched: "+JSON.stringify(res))),
     catchError(this.handleError)
   )
  }
  viewprofile():Observable<any>{
    this.user=localStorage.getItem("userId");
    return this.http.get("http://localhost:4000/coaches/"+this.user).pipe(
      tap(res=>console.log("data fetched: "+JSON.stringify(res))),
      catchError(this.handleError)
    )
   }

  private handleError(err:HttpErrorResponse){
    this.errorMsg='';
    if(err.error instanceof Error){
     console.log("An error ocurred: "+err.error.message);
     this.errorMsg=err.error.message;
    }else{
      console.log("Backend error: "+err.error.message);
      this.errorMsg=err.error.message;
    }
    return throwError(this.errorMsg);
  }
}
