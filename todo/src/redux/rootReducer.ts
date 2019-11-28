import {combineReducers} from "redux";

import task from './task/reducers';

const rootReducer = combineReducers({
    task
});

export default rootReducer;
