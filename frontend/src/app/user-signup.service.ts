import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  errorMsg:string;
  constructor(private http:HttpClient) { }
  userregister(data):Observable<any>{
    return this.http.post("http://localhost:4000/users",data).pipe(
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
