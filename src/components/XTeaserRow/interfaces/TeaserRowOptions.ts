export interface TeaserRowOptions {
  heading?: string;
  text?: string;
  items: Item[];
}

interface Item {
  headline: string;
  url: string;
  linkLabel: string;
  target?: string;
  text?: string;
  list?: ListItem[];
}

interface ListItem {
  heading: string;
}
