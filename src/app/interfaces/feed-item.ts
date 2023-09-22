import { FeedItemAudio } from "./feed-item-audio";

export interface FeedItem {
    title: string;
    pubDate: Date;
    link: string;
    author: string;
    enclosure: FeedItemAudio;
}
