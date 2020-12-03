import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoachLoginService {
  logged:boolean=false;
  errorMsg:string;
  constructor(private http:HttpClient) { }

  coachlogin(data):Observable<any>{
    console.log(data);
    return this.http.post('http://localhost:4000/coaches/login',data).pipe(
      tap(res=>{console.log("data fetched: "+JSON.stringify(res))
    if(res){
      this.logged=true;
    }}),
      catchError(this.handleError)
    )
  }
  private handleError(err:HttpErrorResponse){
   this.errorMsg="";
   if(err.error  instanceof Error){
     console.log("An error occurred: "+err.error.message);
     this.errorMsg=err.error.message;
   }else{
    console.log("Backend error: "+err.error.message);
    this.errorMsg=err.error.message;
   }
   return throwError(this.errorMsg);
  }
}
