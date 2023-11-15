import {USERINFO} from '../actions';

const initState = {
  user:{}
};

const userInfo = (state = initState, action) => {
  switch (action.type) {
    case USERINFO.UPDATEUSERINFO:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default userInfo;