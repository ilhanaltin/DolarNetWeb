import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/main/services/authentication.service';

@Component({
  selector: 'navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  constructor(public _authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
