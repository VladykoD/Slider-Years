export type Slide = {
  id: string;
  date: string[];
  events: Event[];
  category: string;
};

export type Event = {
  id: string;
  date: string;
  description: string;
};
