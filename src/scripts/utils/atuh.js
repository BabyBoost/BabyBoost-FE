export const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem('1de9d40a-9738-11ee-b9d1-0242ac120002');
  return accessToken !== null;
};

export const isDataAvail = () => {
  const idAnak = localStorage.getItem('c3f36ae8-9844-11ee-b9d1-0242ac120002');
  return idAnak !== null;
};
