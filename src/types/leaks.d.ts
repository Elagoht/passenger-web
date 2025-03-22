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
