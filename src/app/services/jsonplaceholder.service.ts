import { User } from './../wrappers/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response, Request, RequestOptions, RequestOptionsArgs, XHRBackend } from '@angular/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class JsonplaceholderService extends Http {

  storeUsers: User[];

  constructor(backend: XHRBackend, options: RequestOptions, public http: Http) {
    super(backend, options);
  }

  private ejecutarServicioGet(url: string , params?: HttpParams ): Observable<Response> {

    return this.request(url, {
        search: params,
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'responseType': 'application/json'
        })
    });
  }

  private ejecutarServicioPost(url: string, data): Observable<Response> {
    return this.request(url, {
        body: JSON.stringify(data),
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'responseType': 'application/json'
        })
    });
  }

  saveUser( user: User) {
    user.id = this.storeUsers.length + 1;
    this.storeUsers.push( user );
  }

  setStoreUsers( users?: User[] ) {
    if ( users === undefined ) {
      this.getUsers().subscribe( (response) => {
        this.storeUsers = JSON.parse(response._body);
      });
    } else {
      this.storeUsers = users;
    }
  }

  setStoreUser( user: User ) {
    if ( this.storeUsers === undefined ) { return; }
    this.storeUsers.map( (us, index) => {
      if ( us.id === user.id ) {
        this.storeUsers[index] = user;
        return;
      }
    });
  }

  getUser( userId ): Observable<any> {
    if ( this.storeUsers === undefined) {
      this.setStoreUsers();
      return this.ejecutarServicioGet( 'https://jsonplaceholder.typicode.com/users/' + userId );
    } else {
      const user = this.storeUsers.filter( (_user) => _user.id == userId)[0];
      return new Observable( (observer) => {
        observer.next( { _body : JSON.stringify(user)} );
      });

    }
  }

  getUsers(): Observable<any> {
    if ( this.storeUsers !== undefined) {
      return new Observable( (observer) => {
        observer.next( { _body : JSON.stringify(this.storeUsers)} );
      });
    } else {
      return this.ejecutarServicioGet( 'https://jsonplaceholder.typicode.com/users' );
    }
  }

  getAlbums( userId ): Observable<any> {
    return this.ejecutarServicioGet( 'https://jsonplaceholder.typicode.com/albums?userId=' + userId );
  }

  getPhotos( albumId ): Observable<any> {
    return this.ejecutarServicioGet( 'https://jsonplaceholder.typicode.com/photos?albumId=' + albumId );
  }

  getPosts( userId): Observable<any> {
    return this.ejecutarServicioGet( 'https://jsonplaceholder.typicode.com/posts?userId=' + userId );
  }

  getComments( postId): Observable<any> {
    return this.ejecutarServicioGet( 'https://jsonplaceholder.typicode.com/comments?postId=' + postId );
  }

}
