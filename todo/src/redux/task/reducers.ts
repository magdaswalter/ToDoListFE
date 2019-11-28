import initialState from "../initialState";
import * as types from './types';
import {AnyAction} from "redux";

export default function task(state = initialState, action: AnyAction) {
    switch (action.type) {
        case types.GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks,
                paginationDetails: action.paginationDetails
            };
        case types.CREATE_TASKS_SUCCESS:
        case types.DELETE_TASKS_SUCCESS:
        default:
            return state;
    }
}
