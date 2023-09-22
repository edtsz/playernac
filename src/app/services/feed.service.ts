import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, of, Observable, catchError, switchMap } from 'rxjs';
import { Feed } from '../interfaces/feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient,
  ) { }

  load(page: number = 1) {
    // let feed = localStorage.getItem('_feed');

    // if ( !feed )
      let url = `https://segurancalegal.com/feed?paged=${page}`;
      return this.http.get<Feed>(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`)
        .pipe(
          tap((_feed: Feed) => {
            console.log('pipe(tap)', _feed);

            if (_feed?.status === 'ok') {
              localStorage.setItem('_feed', JSON.stringify(_feed));
            }
          }),
        );

    // return of(JSON.parse(feed));
  }
}
