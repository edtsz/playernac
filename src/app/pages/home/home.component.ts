import { Component, ViewChild, ElementRef } from '@angular/core';
import { FeedService } from 'src/app/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any = {};
  @ViewChild('player') player?: ElementRef;
  playing: any = {};

  constructor(
    private feed: FeedService,
  ) {}

  ngOnInit() {
    this.feed.load()
      .subscribe({
        next: (feed) => {
          this.data = feed;
          console.log(feed);
        },
        error: (response) => {
          console.error(response);
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
