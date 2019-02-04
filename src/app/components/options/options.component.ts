import { JsonplaceholderService } from './../../services/jsonplaceholder.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../wrappers/user';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  user: User;
  userId;
  options = [
              {value: 'Albums', link: 'albums'},
              {value: 'Posts', link: 'posts'},
              {value: 'Edit', link: 'edition'}
            ];

  constructor( private route: ActivatedRoute,
                private fakeAPI: JsonplaceholderService ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    if ( this.user === undefined ) {
      this.fakeAPI.getUser( this.userId ).subscribe( (response) => this.user = JSON.parse(response._body) );
    }
  }

}
