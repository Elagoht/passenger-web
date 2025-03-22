type Paginated<T> = {
  page: number;
  take: number;
  total: number;
  data: T[];
};
