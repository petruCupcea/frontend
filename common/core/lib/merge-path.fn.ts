export const mergePath = (path: Array<string>) => {
  let merged = '';

  path.forEach((item) => {
    merged += '/' + item;
  });

  return merged;
};
