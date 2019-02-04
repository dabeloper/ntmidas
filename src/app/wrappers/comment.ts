export class Comment {

    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;

    constructor( json ) {
        this.postId = json['postId'];
        this.id = json['id'];
        this.name = json['name'];
        this.email = json['email'];
        this.body = json['body'];
    }
}
