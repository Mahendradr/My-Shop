// Action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action creators
export const login = (userData) => {
  return {
    type: LOGIN,
    payload: userData,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
