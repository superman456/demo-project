import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  deparmentList!:AngularFireList<any>;
  array:any[]=[];

  constructor(private firebase:AngularFireDatabase) {
    this.deparmentList =this.firebase.list('departments');
    console.log("service",this.deparmentList);
    
    this.deparmentList.snapshotChanges().subscribe(list=>{
      this.array= list.map(item=>{
        return{
          $key:item.key,
          ...item.payload.val()
        }
      })
    });
  }
}
