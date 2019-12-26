import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { PostVM } from '../../models/blog/PostVM';
import { PagingVM } from '../../models/PagingVM';
import { PostSearchCriteriaVM } from '../../models/blog/PostSearchCriteriaVM';
/* import '../../../../@dolarnet/js/main.js';
import '../../../../@dolarnet/js/owl.carousel.js'; */

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {  

  postList: PostVM[];
  post1: PostVM;
  post2: PostVM;
  post3: PostVM;
  post4: PostVM;
  post5: PostVM;
  post6: PostVM;
  post7: PostVM;
  post8: PostVM;
  post9: PostVM;
  post10: PostVM;

  constructor(private _blogService: BlogService) {
    this.loadScripts();
    this.getSliderPosts();
   }

  ngOnInit() {
  }

  loadScripts() {
    const dynamicScripts = [
     '../../../assets/js/owl.carousel.js',
     '../../../assets/js/main.js'
    ];

    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  getSliderPosts()
  {
    console.log("getSliderPosts");

    let criteria = new PostSearchCriteriaVM();
    criteria.itemCount = 10;
    criteria.pageId=0;
    criteria.isSliderPost = true;
    criteria.categoryId = -1;

    this._blogService.get(criteria).subscribe(response=>{
        this.postList = response.result.postList;
        this.post1 = this.postList[0];
        this.post2 = this.postList[1];
        this.post3 = this.postList[2];
        this.post4 = this.postList[3];
        this.post5 = this.postList[4];
        this.post6 = this.postList[5];
        this.post7 = this.postList[6];
        this.post8 = this.postList[7];
        this.post9 = this.postList[8];
        this.post10 = this.postList[9];
    })
  }
}
