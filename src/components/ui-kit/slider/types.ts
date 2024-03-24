export type Slide = {
  id: string;
  date: string[];
  events: Event[];
  category: string;
};

export type Event = {
  date: string;
  description: string;
};
