import {combineReducers} from '@reduxjs/toolkit';
import userInfo from './user';
import settings from './settings';


const Reducer = combineReducers({userInfo, settings});

export default Reducer;