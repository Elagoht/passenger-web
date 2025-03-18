type Tag = {
  id: string;
  name: string;
  color: string;
  icon: number;
  isPanic?: boolean;
};

type RequestTagAdd = Omit<Tag, "id" | "isPanic">;

type RequestTagUpdate = Partial<RequestTagAdd>;