import { Album } from './../../wrappers/album';
import { JsonplaceholderService } from './../../services/jsonplaceholder.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../wrappers/user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements  OnInit, OnDestroy {

  user: User;
  userId;
  albumSubscription: Subscription;
  photoSubscription: Subscription;
  albums: Album[] = [];

  constructor(private fakeAPI: JsonplaceholderService,
              private route: ActivatedRoute ) {
  }

  ngOnDestroy(): void {
    this.albumSubscription.unsubscribe();
    if ( this.photoSubscription ) { this.photoSubscription.unsubscribe(); }
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.albumSubscription = this.fakeAPI.getAlbums(this.userId).subscribe( ( response ) => this.albums = JSON.parse(response._body) );
    if ( this.user === undefined ) {
      this.fakeAPI.getUser( this.userId ).subscribe( (response) => this.user = JSON.parse(response._body) );
    }
  }

  getPhotos(albumId) {
    this.albums.map( (alb: Album) => {
      if ( alb.id !== albumId ) {
        alb.photos = undefined;
      } else {
        this.photoSubscription = this.fakeAPI.getPhotos(albumId).subscribe( ( response ) => alb.photos = JSON.parse(response._body) );
      }
    });
  }

}
