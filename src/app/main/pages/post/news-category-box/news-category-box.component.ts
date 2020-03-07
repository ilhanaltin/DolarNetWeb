import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';

@Component({
  selector: 'news-category-box',
  templateUrl: './news-category-box.component.html',
  styleUrls: ['./news-category-box.component.css']
})
export class NewsCategoryBoxComponent implements OnInit {

  readonly _globalConstants = GlobalConstants;

  constructor() { }

  ngOnInit() {
  }

  getCategoryName(category: number) : string
  {
      return GlobalConstants.PostCategoriesLongNameForUrl[category - 1];
  }
}
