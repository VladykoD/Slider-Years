export type Slide = {
  id: string;
  startDate: string[];
  endDate: string[];
  events: Event[];
  category: Category;
};

export type Category = {
  id: number;
  label: string;
};

export type Event = {
  date: string;
  description: string;
};
