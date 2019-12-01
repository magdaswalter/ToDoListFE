import initialState from "../initialState";
import update from 'react-addons-update';
import * as types from './types';
import {AnyAction} from "redux";

export default function task(state = initialState, action: AnyAction) {
    switch (action.type) {
        case types.GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks,
                paginationDetails: {
                    totalPages: action.paginationDetails.totalPages,
                    totalElements: action.paginationDetails.totalElements,
                    actualPage: action.paginationDetails.actualPage
                }

            };
        case types.CREATE_TASKS_SUCCESS:
                return {
                    ...state,
                    tasks: [...state.tasks, action.task],
                    paginationDetails: {
                        ...state.paginationDetails
                    }
                };
        case types.UPDATE_TASKS_SUCCESS:
            return update(state, {
                tasks: {
                    [action.index]: {
                        taskName: {$set: action.task.taskName},
                        id: {$set: action.task.id},
                        description: {$set: action.task.description},
                        status: {$set: action.task.status}
                    }
                }
            });
        case types.DELETE_TASKS_SUCCESS:
            return {
                ...state,
                tasks: [
                    ...state.tasks.slice(0,action.stateId),
                    ...state.tasks.slice(action.stateId + 1)
                ]
            };
        default:
            return state;
    }
}
