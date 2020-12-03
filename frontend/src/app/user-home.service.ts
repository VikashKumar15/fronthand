import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserHomeService {
  
  errorMsg:string;
  user:string=localStorage.getItem("userId");
  constructor(private http:HttpClient) { }

  allcoaches():Observable<any>{

    return this.http.get("http://localhost:4000/coaches/all").pipe(
      tap(res=>console.log("data fetched: "+JSON.stringify(res))),
      catchError(this.handleError)
    )
  }
  viewdetails():Observable<any>{

    return this.http.get("http://localhost:4000/users/"+this.user).pipe(
      tap(res=>console.log("data fetched: "+JSON.stringify(res))),
      catchError(this.handleError)
    )
  }
  appointments():Observable<any>{

    return this.http.get("http://localhost:4000/users/booking/"+this.user).pipe(
      tap(res=>console.log("data fetched: "+JSON.stringify(res))),
      catchError(this.handleError)
    )
  }
  confirmAppointment(data):Observable<any>{
    let id=sessionStorage.getItem('coachId');
    sessionStorage.removeItem('coachId');
    return this.http.post("http://localhost:4000/users/booking/"+this.user+"/"+id,data).pipe(
      tap(res=>console.log("data fetched: "+JSON.stringify(res))),
      catchError(this.handleError)
    )
  }
  rescheduleAppointment(data):Observable<any>{
    let id=sessionStorage.getItem('bookingId');
    sessionStorage.removeItem('bookingId');
    return this.http.put("http://localhost:4000/booking/"+id,data).pipe(
      tap(res=>console.log("data fetched: "+JSON.stringify(res))),
      catchError(this.handleError)
    )
  }
  cancel():Observable<any>{
    let id=sessionStorage.getItem('bookingId');
    sessionStorage.removeItem('bookingId');
    return this.http.delete("http://localhost:4000/booking/"+id).pipe(
      tap(res=>console.log("data fetched: "+JSON.stringify(res))),
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
