import {SETTINGS} from '../actions';

const initState = {
  language: 'en-US',
  theme: 'day',
};

const settings = (state = initState, action) => {
  switch (action.type) {
    case SETTINGS.UPDATELANGUAGE:
      return {...state, language: action.payload};
    case SETTINGS.UPDATETHEME:
      return {...state, theme: action.payload};
    default:
      return state;
  }
};

export default settings;