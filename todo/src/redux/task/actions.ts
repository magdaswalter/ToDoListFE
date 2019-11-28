import axios from 'axios';
import * as types from './types';
import * as interfaces from '../../interfaces/task.type';
import {Simulate} from "react-dom/test-utils";
import {AnyAction, Dispatch} from "redux";


export const httpToDo = axios.create({
    baseURL: 'http://localhost:9090/tasks',
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        common: {
            'x-user-timezoneOffset': ''
        }
    }
});

export function requestDispatch(type: string) {
    return {type};
}

export function getTasks(page: number): any {
    const getTasksUrl = '/page=' + page;

    return function (dispatch: Dispatch) {
        dispatch(requestDispatch(types.GET_TASKS_REQUEST));
        return httpToDo.get(getTasksUrl)
            .then((response: interfaces.ToDoResponse) => {
                const data = response.data[0];
                dispatch({
                    type: types.GET_TASKS_SUCCESS,
                    tasks: data.content,
                    paginationDetails: {
                        totalPages: data.totalPages,
                        totalElements: data.totalElements
                    }
                })
            }).catch(error => {
                dispatch(requestDispatch(types.GET_TASKS_ERROR));
                alert('Something went wrong during fetching the tasks, message: ' + error);
            })
    }
}

export function createTask(createBody: interfaces.PostBody): any {

    return function (dispatch: Dispatch) {
        dispatch(requestDispatch(types.CREATE_TASKS_REQUEST));
        return httpToDo.post('', createBody)
            .then((response: {data: {content: interfaces.Task}}) => {
                debugger;
                const data = response.data;
                dispatch({
                    type: types.CREATE_TASKS_SUCCESS,
                    tasks: data.content,
                })
            }).catch(error => {
                dispatch(requestDispatch(types.CREATE_TASKS_ERROR));
                alert('Something went wrong during task creation or into updated one, message: ' + error);
            })
    }
}

export function deleteTask(taskId: number): any {

    const getTasksUrl = '/' + taskId;

    return function (dispatch: Dispatch) {
        dispatch(requestDispatch(types.CREATE_TASKS_REQUEST));
        return httpToDo.delete(getTasksUrl)
            .then((response: {data: {content: interfaces.Task}}) => {
                debugger;
                const data = response.data;
                dispatch({
                    type: types.CREATE_TASKS_SUCCESS,
                    tasks: data.content,
                })
            }).catch(error => {
                dispatch(requestDispatch(types.CREATE_TASKS_ERROR));
                alert('Something went wrong during task creation or into updated one, message: ' + error);
            })
    }
}
