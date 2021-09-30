import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase) { }
  employeeList1!:AngularFireList<any>;
  employeeList = [
    {
    city: "BJP",
    department: 'id',
    email: "vis@gmail.com",
    fullName: "vishal",
    gender: "1",
    isPermanent: true,
    mobile: "8989797888"
  },
  {
    city: "BJP",
    department: 'id0',
    email: "vinod@gmail.com",
    fullName: "vinod",
    gender: "1",
    isPermanent: true,
    mobile: "768768768"
  },
  {
    city: "BJP",
    department: 'id2',
    email: "db@gmail.com",
    fullName: "db",
    gender: "1",
    isPermanent: true,
    mobile: "7568678"
  },
  {
    city: "BJP",
    department: 'id3',
    email: "jy@gmail.com",
    fullName: "jyt",
    gender: "1",
    isPermanent: true,
    mobile: "4364565"
  },
  {
    city: "BJP",
    department: 'id4',
    email: "ram@gmail.com",
    fullName: "ram",
    gender: "1",
    isPermanent: true,
    mobile: "879879879"
  }
  ]
form: FormGroup = new FormGroup({
  $key: new FormControl(null),
  fullName: new FormControl('', Validators.required),
  email: new FormControl('', Validators.email),
  mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
  city: new FormControl(''),
  gender: new FormControl('1'),
  department: new FormControl(0),
  //hireDate: new FormControl(''),
  isPermanent: new FormControl(false)
})
initializegroupForm(){

  this.form.setValue({
    $key: null,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: '1',
    department: 0,
   // hireDate: '',
    isPermanent: false
  })
}

getEmployeeList(){
   this.employeeList1 = this.firebase.list('employees');
  console.log(`${this.employeeList1} emplist`);
  return this.employeeList1.snapshotChanges();//return Observales from an angularfire list
}

insertEmployee(employee ?: any){
  this.employeeList1.push({
    fullName: employee.fullName,
    email: employee.email,
    mobile: employee.mobile,
    city: employee.city,
    gender: employee.gender,
    department: employee.department,
    //hireDate: employee.hireDate,
    isPermanent: employee.isPermanent
  })
}
updateEmployee(employee ?: any){
  this.employeeList1.update(employee.$key, {
    fullName: employee.fullName,
    email: employee.email,
    mobile: employee.mobile,
    city: employee.city,
    gender: employee.gender,
    department: employee.department,
    hireDate: employee.hireDate,
    isPermanent: employee.isPermanent
  })
}
deleteEmployee($key: string){
  this.employeeList1.remove($key);
}

//update employee object from modal pop up
populateForm(employee?:any){
console.log(`${employee} rowdata Service`);
//this.form.setValue(_.omit(employee,'hireDate'));
this.form.setValue(employee);

}
}
