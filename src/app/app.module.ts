import { JsonplaceholderService } from './services/jsonplaceholder.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {SlideshowModule} from 'ng-simple-slideshow';
import {CarouselModule} from 'angular2-carousel';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule, Http } from '@angular/http';
import { UsersComponent } from './components/users/users.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { OptionsComponent } from './components/options/options.component';
import { AppRoutingModule } from './/app-routing.module';
import { EditionComponent } from './components/edition/edition.component';
import { PostsComponent } from './components/posts/posts.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AlbumsComponent,
    OptionsComponent,
    EditionComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AppRoutingModule,
    SlideshowModule,
    CarouselModule,
    ReactiveFormsModule
  ],
  providers: [
    JsonplaceholderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
