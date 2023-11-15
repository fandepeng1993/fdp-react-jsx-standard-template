import {SETTINGS} from '../actions';

const initState = {
  language: 'zh-CN',
};

const settings = (state = initState, action) => {
  switch (action.type) {
    case SETTINGS.UPDATELANGUAGE:
      return {...state, language: action.payload};
    default:
      return state;
  }
};

export default settings;