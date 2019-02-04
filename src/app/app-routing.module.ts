import { EditionComponent } from './components/edition/edition.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AlbumsComponent } from './components/albums/albums.component';
import { UsersComponent } from './components/users/users.component';
import { OptionsComponent } from './components/options/options.component';
import { PostsComponent } from './components/posts/posts.component';


const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/:userId/options', component: OptionsComponent },
  { path: 'users/:userId/albums', component: AlbumsComponent },
  { path: 'users/:userId/posts', component: PostsComponent },
  { path: 'users/:userId/edition', component: EditionComponent},
  { path: 'users/new', component: EditionComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
