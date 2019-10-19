import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    this.userService.login().subscribe(response =>{
      console.log(response);
      localStorage.setItem("token","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIxIiwidW5pcXVlX25hbWUiOiLEsGxoYW4iLCJmYW1pbHlfbmFtZSI6IkFMVElOIiwicm9sZSI6IjEuWcO2bmV0aWNpIiwibmJmIjoxNTcwNDc2OTgzLCJleHAiOjE2MDIwMTI5ODMsImlhdCI6MTU3MDQ3Njk4M30.8-5VRRHrWXAj6NiNrZpwTn1QyopkIVq2MTO00yIsQPQ");
    });

    this.userService.getAll().subscribe(response =>{
      console.log(response);
    });
  }

}
