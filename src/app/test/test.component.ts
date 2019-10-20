import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ServiceResult } from '../Models/ServiceResult';
import { UserListDetailVM } from '../Models/User/UserListDetailVM';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  usersVM : ServiceResult<UserListDetailVM>;

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    //this.userService.login().subscribe(response =>{
    //  console.log(response);
    //  localStorage.setItem("token","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIxIiwidW5pcXVlX25hbWUiOiLEsGxoYW4iLCJmYW1pbHlfbmFtZSI6IkFMVElOIiwicm9sZSI6IjEuWcO2bmV0aWNpIiwibmJmIjoxNTcwNDc2OTgzLCJleHAiOjE2MDIwMTI5ODMsImlhdCI6MTU3MDQ3Njk4M30.8-5VRRHrWXAj6NiNrZpwTn1QyopkIVq2MTO00yIsQPQ");
    //});

    console.log("test");
    let result : ServiceResult<UserListDetailVM>;

    this.userService.getAll().subscribe(result =>{
      this.usersVM = result; 
      console.log(this.usersVM.Result.UserList);
    });
  }
}
