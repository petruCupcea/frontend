export const idGenerator = (prefix?: string): string => {
  const id = (prefix ? prefix : '') +
    Math.floor(Math.random() * 1000000).toString(16) +
    Math.floor(Math.random() * 1000000).toString(16) +
    Math.floor(Math.random() * 1000000).toString(16);

  return id;
};
