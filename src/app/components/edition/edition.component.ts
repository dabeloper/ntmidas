import { JsonplaceholderService } from './../../services/jsonplaceholder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../wrappers/user';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent implements OnInit {

  title;
  userId;
  user: User = new User({});

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    username: ['', [Validators.required, Validators.minLength(1)]],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      street: ['', [Validators.required, Validators.minLength(1)]],
      suite: ['', [Validators.required, Validators.minLength(1)]],
      city: ['', [Validators.required, Validators.minLength(1)]],
      zipcode: ['', [Validators.required, Validators.minLength(1)]],
      geo: this.fb.group({
        lat: ['', [Validators.required, Validators.minLength(1)]],
        lng: ['', [Validators.required, Validators.minLength(1)]],
      })
    }),
    phone: ['', [Validators.required, Validators.minLength(1)]],
    website: ['', [Validators.required, Validators.minLength(1)]],
    company: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      catchPhrase: ['', [Validators.required, Validators.minLength(1)]],
      bs: ['', [Validators.required, Validators.minLength(1)]]
    }),
  });

  constructor( private fakeAPI: JsonplaceholderService,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder ) { }

  ngOnInit() {
    if ( this.router.url === '/users/new' ) {
      this.title = 'New User';
      this.fakeAPI.setStoreUsers();
      this.user = new User(
        {
          id : -1,
          name : '',
          username : '',
          email : '',
          address : {
            street : '',
            suite : '',
            city : '',
            zipcode : '',
            geo : {
              lat : '',
              lng : ''
            }
          },
          phone : '',
          website : '',
          company : {
            name : '',
            catchPhrase : '',
            bs : ''
          }
        }
      );
    } else {
      this.userId = this.route.snapshot.paramMap.get('userId');
      this.title = 'Edit User';
      if ( this.user === undefined || this.user.id === undefined ) {
        this.fakeAPI.getUser( this.userId ).subscribe( (response) => this.user = JSON.parse(response._body) );
      }
    }
  }

  onSubmit() {
    if ( this.title === 'Edit User' ) {
      this.fakeAPI.setStoreUser(this.user);
    } else {
      this.fakeAPI.saveUser( this.user );
    }
    this.router.navigate(['users']);
  }

  goBack() {
    if ( this.title === 'Edit User' ) {
      this.router.navigate(['/users', this.userId, 'options']);
    } else {
      this.router.navigate(['/users']);
    }
  }

}
