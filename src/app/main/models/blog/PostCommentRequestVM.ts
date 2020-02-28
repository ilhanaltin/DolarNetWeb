export class PostCommentRequestVM{
    postId: number;
    userId: number;   
    parentId: number;
    nameSurname: string;
    email: string;
    comment: string;

    /**
     * Constructor
     *
     * @param postComment
     */
    constructor(postComment)   
    {
        this.userId = postComment.userId || null;
        this.parentId = postComment.userId || null;
        this.nameSurname = postComment.nameSurname || '';
        this.email = postComment.email || '';
        this.postId = postComment.postId || 0;
        this.comment = postComment.comment || '';
    }
}