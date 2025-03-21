type Tag = {
  id: string;
  name: string;
  color: string;
  icon: number;
};

type RequestTagAdd = Omit<Tag, "id">;

type RequestTagUpdate = Partial<RequestTagAdd>;