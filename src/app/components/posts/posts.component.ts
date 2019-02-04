import { Post } from './../../wrappers/post';
import { ActivatedRoute } from '@angular/router';
import { JsonplaceholderService } from './../../services/jsonplaceholder.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../wrappers/user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements  OnInit, OnDestroy {

  user: User;
  userId;
  postSubscription: Subscription;
  commentSubscription: Subscription;
  posts: Post[] = [];

  constructor(private fakeAPI: JsonplaceholderService,
              private route: ActivatedRoute ) {
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
    if ( this.commentSubscription ) { this.commentSubscription.unsubscribe(); }
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    if ( this.user === undefined ) {
      this.fakeAPI.getUser( this.userId ).subscribe( (response) => this.user = JSON.parse(response._body) );
    }
    this.postSubscription = this.fakeAPI.getPosts(this.userId).subscribe( ( response ) => this.posts = JSON.parse(response._body) );
  }

  getComments ( postId ) {
    this.posts.map(
      (post) => {
        if ( post.id !== postId ) {
          post.comments = undefined;
        } else {
          if ( this.commentSubscription ) { this.commentSubscription.unsubscribe(); }
          this.commentSubscription = this.fakeAPI.getComments(postId)
                                        .subscribe( ( response ) =>  post.comments = JSON.parse(response._body) );
        }
      }
    );
  }
}
