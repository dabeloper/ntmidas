import { Comment } from './comment';
export class Post {

    userId: number;
    id: number;
    title: string;
    body: string;
    comments: Comment[];

    constructor( json ) {
        this.userId = json['userId'];
        this.id = json['id'];
        this.title = json['title'];
        this.body = json['body'];
    }

    setComments( comments ) {
        this.comments = comments;
    }
}
