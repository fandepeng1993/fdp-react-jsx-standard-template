import {USERINFO} from '../actions';

const initState = {
  userToken: ''
};

const userInfo = (state = initState, action) => {
  switch (action.type) {
    case USERINFO.UPDATEUSERINFO:
      return {...state, ...action.payload};
    case USERINFO.UPDATEUSERTOKEN:
      return {...state, userToken: action.payload};
    default:
      return state;
  }
};

export default userInfo;