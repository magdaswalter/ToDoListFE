import axios from 'axios';
import * as types from './types';
import * as interfaces from '../../interfaces/task.type';
import { Dispatch } from "redux";


export const httpToDo = axios.create({
    baseURL: 'http://localhost:8080/tasks',
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        common: {
            'x-user-timezoneOffset': ''
        }
    }
});

export function requestDispatch(type: string) {
    return { type };
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
                        totalElements: data.totalElements,
                        actualPage: page
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
            .then((response: { data: { content: interfaces.Task } }) => {
                const data = response.data;
                dispatch({
                    type: types.CREATE_TASKS_SUCCESS,
                    task: data
                })
            }).catch(error => {
                dispatch(requestDispatch(types.CREATE_TASKS_ERROR));
                alert('Something went wrong during task creation, message: ' + error);
            })
    }
}

export function updateTask(updateBody: interfaces.PostBody, index: number): any {

    return function (dispatch: Dispatch) {
        dispatch(requestDispatch(types.UPDATE_TASKS_REQUEST));
        return httpToDo.post('', updateBody)
            .then((response: { data: { content: interfaces.Task } }) => {
                const data = response.data;
                dispatch({
                    type: types.UPDATE_TASKS_SUCCESS,
                    task: data,
                    index: index
                })
            }).catch(error => {
                dispatch(requestDispatch(types.UPDATE_TASKS_ERROR));
                alert('Something went wrong during updating a task, message: ' + error);
            })
    }
}

export function deleteTask(taskId: number, stateId: number): any {

    const getTasksUrl = '/' + taskId;

    return function (dispatch: Dispatch) {
        dispatch(requestDispatch(types.DELETE_TASKS_REQUEST));
        return httpToDo.delete(getTasksUrl)
            .then((response: { data: { content: interfaces.Task } }) => {
                const data = response.data;
                dispatch({
                    type: types.DELETE_TASKS_SUCCESS,
                    stateId: stateId,
                })
            }).catch(error => {
                dispatch(requestDispatch(types.DELETE_TASKS_ERROR));
                alert('Something went wrong during deleteing a task, message: ' + error);
            })
    }
}
