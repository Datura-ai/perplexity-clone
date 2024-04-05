export const domainFromUrl = (url: string) => {
  const match = url.match(
    /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im
  );

  if (match) {
    return match[1];
  }

  return '';
};
