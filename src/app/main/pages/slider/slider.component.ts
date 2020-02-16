import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { PostVM } from '../../models/blog/PostVM';
/* import '../../../../@dolarnet/js/main.js';
import '../../../../@dolarnet/js/owl.carousel.js'; */

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {  

  readonly _globalConstants = GlobalConstants;

  postList: PostVM[];

  constructor(private _blogService: BlogService) {
   }

  ngOnInit() {
    this.getSliderPosts();
  }

  loadScripts() {
    const dynamicScripts = [
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
    this._blogService.getSliderPosts().subscribe(response=>{
        this.postList = response.result.postList;        
        this.loadScripts();
    })
  }
}