export const registerUser = (userData: any) => {
  return {
    type: 'REGISTER_USER',
    payload: userData,
  };
};
 