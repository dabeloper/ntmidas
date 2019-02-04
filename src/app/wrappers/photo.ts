export class Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;

    constructor( json ) {
        this.albumId = json['albumId'];
        this.id = json['id'];
        this.title = json['title'];
        this.url = json['url'];
        this.thumbnailUrl = json['thumbnailUrl'];
    }
}
