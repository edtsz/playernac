import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any = {};
  @ViewChild('player') player?: ElementRef;
  playing: any = {};

  pagination: any = {
    currentPage: 1,
    prevPage: 0,
    nextPage: 0
  }


  constructor(
    private feed: FeedService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pagination.currentPage = parseInt(params['pg'] || 1);
      if (this.pagination.currentPage < 1) {
        this.pagination.currentPage = 1;
      }
      this.pagination.prevPage = this.pagination.currentPage - 1;
      this.pagination.nextPage = this.pagination.currentPage + 1;
      this.loadFeed();
    });
  }

  loadFeed() {
    this.feed.load(this.pagination.currentPage)
      .subscribe({
        next: (feed) => {
          console.log(feed);
          this.data = feed;
        },
        error: (response) => {
          console.error('error', response);
        },
        complete: () => {
          console.log("complete");
        }
      })    
  }

  play(item: any) {
    const element = this.player?.nativeElement;
    this.stop();
    element.src = item.enclosure.link;
    element.play();
    this.playing = item.enclosure;
  }

  stop() {
    const element = this.player?.nativeElement;
    element.pause();
    element.currentTime = 0;
    element.src = "";
    this.playing = {};
  }
}
