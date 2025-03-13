export const getAccounts = async (): Promise<AccountCard[]> => {
  return Promise.resolve(
    Array.from({ length: 10 }, (_, i) => ({
      id: crypto.randomUUID(),
      name: `Account ${i}`,
      identity: `Identity ${i}`,
      tags: [
        {
          id: crypto.randomUUID(),
          name: `Tag ${i}`,
          color: `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")}`,
          icon: 1,
        },
      ],
    })),
  );
};
