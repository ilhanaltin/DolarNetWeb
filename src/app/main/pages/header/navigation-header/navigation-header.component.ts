import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/main/services/authentication.service';
import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';

@Component({
  selector: 'navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  readonly _globalConstants = GlobalConstants;

  constructor(public _authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
