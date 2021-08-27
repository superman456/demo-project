import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,throwError} from 'rxjs'
import {catchError}from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExchangerateService {

  private baseUrl='http://api.exchangeratesapi.io/v1/';
  private access_key='609fef87c9d4468d2f866f678a77c38f';
  constructor(private httpClient:HttpClient) { }
  httpOptions={
    headers:new HttpHeaders({
      'content-type':'applicaton/json'
    })
  }
  //courses deatils
   sampleData = [
    {courseName: "HTML5", prices: 500, name: 'Maximilian schwarzmüller',img:'https://img-c.udemycdn.com/course/240x135/1495788_1aaa_2.jpg',code:'EUR'},
    {courseName: "CSS", prices: 499, name: 'Brad Schiff',img:'https://img-c.udemycdn.com/course/240x135/2691654_2f52_3.jpg',code:'EUR'},
    {courseName: "Java script", prices: 600, name: 'Json Taylor',img:'https://img-c.udemycdn.com/course/240x135/1026604_790b_2.jpg',code:'EUR'},
    {courseName: "Angular", prices: 699, name: 'Oak Academy',img:'https://img-c.udemycdn.com/course/240x135/1455016_0b2d_2.jpg',code:'EUR'},
    {courseName: "Bootstrap", prices: 450, name: 'Ali',img:'https://img-c.udemycdn.com/course/240x135/1010586_b622_3.jpg',code:'EUR'},
    {courseName: "Java", prices: 750, name: 'Johnson',img:'https://img-c.udemycdn.com/course/240x135/806922_6310_3.jpg',code:'EUR'},
 ];

  fetchDetails():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}latest?access_key=${this.access_key}`).pipe(
      catchError(this.errorHandler)
    )
  }

  fetchhistoryDeatils(date:string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}${date}?access_key=${this.access_key}`).pipe(
      catchError(this.errorHandler)
    )
  }
  changeCurrecny(base:string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}latest?access_key=${this.access_key}&base${base}`).pipe(
      catchError(this.errorHandler)
    )
  }

  //fetch course details
  fetchCoursedeatils(){
    return this.sampleData;
  }
  errorHandler(error: { success: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    console.log("service error",error);
    if(error.success instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.success.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
