import { UserVM } from './../Models/User/UserVM';
import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ServiceResult } from '../Models/ServiceResult';
import { UserListResponseDetailsVM } from '../Models/User/UserListResponseDetailsVM';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  usersVM : ServiceResult<UserListResponseDetailsVM>;

  currentUserVM: UserVM;

  getByIdUser: UserVM;
  
  registeredUser: UserVM;

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    this.userService.login().subscribe(response =>{
      this.currentUserVM = response.Result.User;
      localStorage.setItem("token","Bearer " + response.Result.Token);
    });

    this.userService.getAll().subscribe(result =>{
      console.log(result.Result.UserList);
      this.usersVM = result; 
    });

    this.userService.getById().subscribe(response =>{
      this.getByIdUser = response.Result.User;
    });

    /*this.userService.register().subscribe(response =>{
      this.registeredUser = new UserVM();
      this.registeredUser.Name = response.Result.Name;
      this.registeredUser.Surname = response.Result.Surname;
      this.registeredUser.Email = response.Result.Email;
      this.registeredUser.UserName = response.Result.UserName;
    });*/

    this.userService.post().subscribe(response => {
      console.log(response.Status);
    });

    /*this.userService.delete().subscribe(response=>{
      console.log(response.Status);
    });*/
  }
}
