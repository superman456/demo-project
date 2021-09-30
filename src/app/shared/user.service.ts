import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:any;

  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
   }

  listUsers(){
    return this.http.get(`${this.baseUrl}users`);
  }

  viewUsers(id?:string){
    return this.http.get(`${this.baseUrl}users/${id}`);
  }
}
