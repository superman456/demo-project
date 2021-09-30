import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from 'src/app/shared/employee.service';
import {EmployeeService} from '../../shared/employee.service';
import {DepartmentService} from '../../shared/department.service';
import {NotificationService} from '../../shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(public service:EmployeeService,public departmentService:DepartmentService,
    public notificationService:NotificationService,public matDialogRef:MatDialogRef<EmployeeComponent>) { }

  departments=[
    {id:1,value:'dep1'},
    {id:2,value:'dep2'},
    {id:3,value:'dep3'}

  ]
  ngOnInit(): void {
    this.service.getEmployeeList();
    this.departmentService.deparmentList
  }
  setClear(){
    this.service.form.reset();//intialize values to null
    console.log("hi");
    this.service.initializegroupForm();
  }

  //form save
  save(){
    if(this.service.form.valid){
      this.service.insertEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializegroupForm();
      this.notificationService.success('Data Saved Sucessfully!!!!')
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializegroupForm();
    this.matDialogRef.close();
  }
}
