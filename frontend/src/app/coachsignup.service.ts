import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import  {catchError,tap} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CoachsignupService {

  errorMsg:string;
  constructor(private http:HttpClient) { }
  coachregister(data):Observable<any>{
    return this.http.post('http://localhost:4000/coaches',data).pipe(
      tap(data=>console.log("data fetched:"+JSON.stringify(data))),
      catchError(this.handleError)
    )
  }
  private handleError(err:HttpErrorResponse){
    this.errorMsg="";
    if(err.error instanceof Error){
      console.log("An error occurred:"+err.error.message);
      this.errorMsg=err.error.message;

    }else{
      console.log("backend error: "+err.error.message);
      this.errorMsg=err.error.message;
    }
    return throwError(this.errorMsg);
  }
}
