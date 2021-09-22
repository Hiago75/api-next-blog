export const formatExpiration = (tokenExpiration: number) => {
  return new Date(tokenExpiration * 1000);
};
