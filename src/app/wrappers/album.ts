import { Photo } from './photo';
export class Album {
    userId: number;
    id: number;
    title: string;
    photos: Photo[];

    constructor( json ) {
        this.userId = json['albumId'];
        this.id = json['id'];
        this.title = json['title'];
    }

    setPhotos( photos ) {
        this.photos = photos;
    }
}
