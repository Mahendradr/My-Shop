import { LOGIN, LOGOUT } from '../action/action';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),  // No user initially
  };

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          user: action.payload,
        };
      case LOGOUT:
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;