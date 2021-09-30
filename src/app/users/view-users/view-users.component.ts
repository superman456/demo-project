import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  constructor(private userService:UserService,private activerRoute:ActivatedRoute) { }
  userId:any;
  userdeatils:any;
  ngOnInit(): void {
    this.activerRoute.params.subscribe(data=>{
      this.userId=data.id;
      console.log(this.userId);
      
    })
    this.getUserView();
  }

  getUserView(){
    this.userService.viewUsers(this.userId).subscribe((res:any)=>{
      console.log(res);
      this.userdeatils=res;
    })
    // this.userdeatils=res,
    // error=>console.error('error occoured'));
  }
}
