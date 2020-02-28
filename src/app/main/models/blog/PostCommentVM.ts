import { UserVM } from './../user/UserVM';

export class PostCommentsVM{
    id: number;
    postId: number;
    userId: number;   
    parentId: number;
    nameSurname: string;
    parentCommen:PostCommentsVM;
    childComments:PostCommentsVM[];
    avatar: string;
    userName: string;
    userNickName: string;
    email: string;
    comment: string;
    dateTime: Date;

    /**
     * Constructor
     *
     * @param postComment
     */
    constructor(postComment)   
    {
        this.id = postComment.id || 0;
        this.userId = postComment.userId || null;
        this.parentId = postComment.userId || null;
        this.avatar = postComment.avatar || 'assets/images/avatars/profile.jpg';
        this.nameSurname = postComment.nameSurname || '';
        this.email = postComment.email || '';
        this.postId = postComment.postId || 0;
        this.comment = postComment.comment || '';
    }
}