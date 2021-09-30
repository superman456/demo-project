import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  listData!:MatTableDataSource<any>;
  displayColumns:string[]=['fullName','department','email','gender','isPermanent','mobile','actions'];
  @ViewChild(MatSort)sort!:MatSort;
  searchKey:string='';
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  constructor(private employeeService:EmployeeService,private dialog:MatDialog,
  private nofityservice:NotificationService,private dialogconfirmService:DialogService) { }

  ngOnInit(): void {

    
    this.employeeService.getEmployeeList().subscribe(list=>{
      let array= list.map((item:any)=>{
        return{
          $key:item.key,
          ...item.payload.val()
        }
      })
      this.listData=new MatTableDataSource(array);
      this.listData.sort=this.sort;
      this.listData.paginator=this.paginator;
      // this.listData.filterPredicate=(data,filter)=>{ //data is complete list & filter is searchKey
      //   return this.displayColumns.some(ele=>{
      //     console.log(` column${ele}`);
      //     console.log(` ${data[ele]} data element`);
      //     return ele !='actions' && data[ele].indexOf(filter)!=-1;
      //   })
      // }
    });
  }

  serchClear(){
    this.searchKey='';
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }
  onCreate(){
    this.employeeService.initializegroupForm();
    this.dialogOpen();
  }
  onEdit(row:any){
    console.log(`${row} rowdata`);
    this.employeeService.populateForm(row);
    this.dialogOpen();
  }

  dialogOpen(){
    let dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="60%";
    //dialogConfig.autoFocus=false;
    this.dialog.open(EmployeeComponent,dialogConfig)
  }
  ondelete(key:any){
    // 
    this.dialogconfirmService.openConfirmDialog('Are you sure to delete this record ?').
    afterClosed().subscribe(res=>{
     if(res){
      this.employeeService.deleteEmployee(key);
      this.nofityservice.warn(" !Deleted successfully"); 
     }
      
    })
  }
}
