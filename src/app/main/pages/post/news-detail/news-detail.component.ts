import { PostCommentsVM } from './../../../models/blog/PostCommentVM';
import { BlogService } from '../../../services/blog.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PostVM } from '../../../models/blog/PostVM';
import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/main/services/authentication.service';
import { PostCommentRequestVM } from 'src/app/main/models/blog/PostCommentRequestVM';

@Component({
  selector: 'news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  
  @ViewChild("commentFormDiv") commentForm: ElementRef;
  @ViewChild("commentAreatInput") commentAreatInput: ElementRef;
  
  readonly _globalConstants = GlobalConstants;

  postComment: PostCommentsVM = new PostCommentsVM({});
  commentToReply: PostCommentsVM;
  isCommentSaved: boolean = false;

  post: PostVM = new PostVM({});

  postCommentForm: FormGroup;

  parentPostComments: PostCommentsVM[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private _blogService: BlogService,
    private _formBuilder: FormBuilder,
    public _authenticationService: AuthenticationService) 
    {
    }

  ngOnInit() {
    this.postCommentForm = this.createPostCommentForm();

    this.route.paramMap.subscribe((params : ParamMap)=> { 
        this.getPostDetail(params.get('id')); 
    });
  }

  createPostCommentForm(): FormGroup
  {
      let currentUser = this._authenticationService.currentUser;

      if(currentUser == null)
      {
        return this._formBuilder.group({          
          id              : [this.postComment.id],
          nameSurname     : [this.postComment.nameSurname, Validators.required],
          email           : [this.postComment.email, [Validators.required, Validators.email]],
          comment         : [this.postComment.comment, Validators.required]
        });
      }
      else 
      {
        return this._formBuilder.group({ 
          id              : [this.postComment.id],
          comment         : [this.postComment.comment, Validators.required]
        });
      }
  }

  saveComment(comment)
  {
     let currentUser = this._authenticationService.currentUser;

     let postComment = new PostCommentRequestVM({});

     postComment.postId = this.post.id;

     if(currentUser != null)
     {
        postComment.userId = currentUser.id;
     }

     postComment.comment = comment.comment;
     postComment.email = comment.email;
     postComment.nameSurname = comment.nameSurname; 

     if(this.commentToReply != null)
     {
        postComment.parentId = this.commentToReply.id;
     }

     this._blogService.addComment(postComment).subscribe(resp=>{
        this.postCommentForm = this.createPostCommentForm();

        this.isCommentSaved = true;
        setTimeout( () => {
          this.isCommentSaved = false;
          this.commentToReply = null;
        }, 2000);

        this.getPostDetail(this.post.id);
    });
  }

  getPostDetail(id)
  {
      this._blogService.getById(id).subscribe(response => {
        this.post = response.result.post;
        this.parentPostComments = this.post.comments.filter(t=>t.parentId === null);
      });
  }

  getAvatar(avatar)
  {
      return avatar == null ? 'assets/images/avatars/profile.jpg' : avatar;
  }

  public replyToComment(comment)
  {
      this.commentToReply = comment;
      this.focusInput();
  }

  public cancelReplyToComment()
  {
    this.commentToReply = null;
  }

  focusInput() {
    this.commentForm.nativeElement.scrollIntoView({ behavior: 'smooth' });

    setTimeout( () => {
      this.commentAreatInput.nativeElement.focus();
    }, 1500);
  }
}