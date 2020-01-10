import { GlobalConstants } from './../../../models/constants/GlobalConstants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post-category-header',
  templateUrl: './post-category-header.component.html',
  styleUrls: ['./post-category-header.component.css']
})
export class PostCategoryHeaderComponent implements OnInit {

  readonly _globalConstants = GlobalConstants;

  constructor() { }

  ngOnInit() {
  }

}
