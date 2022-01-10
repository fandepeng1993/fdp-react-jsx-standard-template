import {combineReducers} from 'redux';
import userInfo from './user';
import settings from './settings';


const Reducer = combineReducers({userInfo, settings});

export default Reducer;