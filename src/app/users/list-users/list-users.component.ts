import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  userList:any[]=[];
  
  tablevaule =[
    {
       "id":"0001",
       "type":"donut",
       "name":"Cake",
       "image":{
          "url":"images/0001.jpg",
          "width":200,
          "height":200
       },
       "thumbnail":{
          "url":"images/thumbnails/0001.jpg",
          "width":32,
          "height":32
       }
    },
    {
       "id":"0002",
       "type":"donut2",
       "name":"Cake2",
       "image":{
          "url":"images/0001.jpg",
          "width":200,
          "height":200
       },
       "thumbnail":{
          "url":"images/thumbnails/0001.jpg",
          "width":32,
          "height":32
       }
    }
 ]
 
  constructor(private userService:UserService) { 
    console.log(this.tablevaule);
    
  }
  spaghettiResponse:any={};
  spaghettiResponse1:any= { 
   "skill" : 
     { 
        "start_date" : "10/10/2001",
        "end_date" : "10/10/20015",
        "code":1
     },
    "education": 
     { 
        "start_date" : "10/10/2001",
        "end_date" : "10/10/20015",
        "code":1
     },
    "experience": 
     { 
        "start_date" : "10/10/2001",
        "end_date" : "10/10/20015",
        "code":1
     }
 }
  ngOnInit(): void {
 
    let spaghettiProperties = Object.keys(this.spaghettiResponse1);
    console.log('spaghettiProperties',spaghettiProperties);
    
    let neededArray = [];
    let i=0
  
   this.spaghettiResponse={ ...this.spaghettiResponse1 }
    for (const prop of spaghettiProperties ) { 
       //console.log('this.spaghettiResponse',this.spaghettiResponse);
       console.log('this.spaghettiResponse[prop]',this.spaghettiResponse);
      neededArray.push(this.spaghettiResponse[prop]);
      neededArray[i]['name'] = prop;
      i++;
  }
  
    this.getUserList();
  }
  getUserList(){
    this.userService.listUsers().subscribe((res:any)=>this.userList=res,
    err => console.log('HTTP Error', err),)
  }
}
