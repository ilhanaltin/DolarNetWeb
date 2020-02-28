import { NewsDetailComponent } from './../news-detail/news-detail.component';
import { PostCommentsVM } from './../../../models/blog/PostCommentVM';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-comment',
  template: `<div *ngFor="let comment of comments">
                <ul class="list-group container">
                    <li class="list-group-item container">
                        <div class="row news-detail-comment-section-item">
                            <div class="col-md-1 pt-0 pl-0 pr-0">
                                <img class="news-detail-comment-section-item-avatar img-fluid rounded-circle"
                                    [src]="getAvatar(comment.avatar)" alt="">
                            </div>
                            <div class="col-md-11">
                                <p class="news-detail-comment-section-item-user">{{comment.userId == null ? comment.nameSurname : comment.userNickName}}</p>
                                <p class="news-detail-comment-section-item-comment">{{comment.comment}}</p>
                            </div>
                            <div class="col-md-9">

                            </div>
                            <div class="col-md-3">
                                <!-- <button mat-button mat-icon-button matSuffix>
                                    <mat-icon aria-hidden="false" aria-label="Example home icon">favorite</mat-icon>
                                </button> -->
                                <button mat-button mat-icon-button matSuffix>
                                    <mat-icon aria-hidden="false" aria-label="Example home icon">favorite_border</mat-icon>
                                </button>
                                <button mat-button mat-icon-button matSuffix>
                                    <mat-icon aria-hidden="false" aria-label="Example home icon" (click)="replyToComment(comment)">reply</mat-icon>
                                </button>
                            </div> 
                        </div> 
                                            
                        <post-comment [comments]="comment.childComments" *ngIf="comment.childComments"></post-comment>
                    </li>
                </ul>
            </div>`,
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

  commentToReply: PostCommentsVM;

  @Input() comments: PostCommentsVM[];

  constructor(private _newsDetailComponent: NewsDetailComponent) { }

  ngOnInit(): void {
  }

  replyToComment(comment)
  {
      this._newsDetailComponent.replyToComment(comment);
  }

  cancelReplyToComment()
  {
      this._newsDetailComponent.cancelReplyToComment();
  }

  getAvatar(avatar)
  {
      return avatar == null ? 'assets/images/avatars/profile.jpg' : avatar;
  }
}