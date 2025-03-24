type Leak = {
  id: string;
  name: string;
  title: string;
  domain: string;
  date: string;
  pwnCount: number;
  verified: boolean;
  logo: string;
};

type ResponseLeaks = Paginated<Leak>;

type LeaksQuery = {
  page?: number;
  take?: number;
  name?: string;
  title?: string;
  domain?: string;
  date?: string;
  dateTo?: string;
  pwnCount?: number;
  pwnCountTo?: number;
  verified?: boolean;
  sortBy?: "name" | "title" | "domain" | "date" | "pwnCount" | "verified";
  sortOrder?: "asc" | "desc";
};
