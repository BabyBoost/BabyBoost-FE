const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken !== null;
};

export default isUserLoggedIn;
