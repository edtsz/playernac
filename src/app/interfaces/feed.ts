import { FeedItem } from "./feed-item";

export interface Feed {
    status: string;
    items: [FeedItem];
}
