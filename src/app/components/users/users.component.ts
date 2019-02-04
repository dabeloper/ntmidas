import { JsonplaceholderService } from './../../services/jsonplaceholder.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../wrappers/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements  OnInit, OnDestroy {

  userSubscription: Subscription;
  users: User[] = [];

  constructor(private fakeAPI: JsonplaceholderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userSubscription = this.fakeAPI.getUsers().subscribe(
      ( response ) => {
        this.users = JSON.parse(response._body);
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  showOptions(user: User) {
    this.router.navigate(['/users', user.id, 'options']);
  }

  deleteUser(user: User) {
    this.users.map( (us, index) => {
      if ( us.id === user.id ) {
        this.users.splice( index , 1);
        this.fakeAPI.setStoreUsers(this.users);
        return;
      }
    });
  }

}
