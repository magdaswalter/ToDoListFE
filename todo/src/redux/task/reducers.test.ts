import { cloneDeep } from 'lodash';

import reducer from './reducers';
import initialState from '../initialState';
import * as types from './types';


describe('Task reducer', () => {

    const TEST_STATE = {
        tasks: [
            {
                id: 0,
                taskName: '',
                description: '',
                status: ''
            }
        ],
        paginationDetails: {
            totalPages: 0,
            totalElements: 0,
            actualPage: 0
        }
    };

    it('should return the initial state', () => {
        const outputState = reducer(initialState, {type: 'TEST_ACTION'});
        expect(outputState).toBe(initialState);
    });

    it('should handle GET_TASKS_SUCCESS', function () {
        const cloneState = cloneDeep(TEST_STATE);
        const inputState = {
            ...cloneState,
            task: {
                ...cloneState.tasks,
                ...cloneState.paginationDetails
            }
        };

        const outputState = reducer(inputState, {
            type: types.GET_TASKS_SUCCESS
        });

        expect(outputState.tasks.length).toBe(0);
        expect(outputState.tasks.paginationDetails.totalPages).toBe(2);
        expect(outputState.summaryView.isFetching).toBe(true);
    });

    it('should handle GET_TASKS__ERROR', function () {
        const cloneState = cloneDeep(TEST_STATE);
        const inputState = {
            ...cloneState,
            task: {
                ...cloneState.tasks,
                ...cloneState.paginationDetails
            }
        };
        const outputState = reducer(inputState, {
            type: types.GET_TASKS_ERROR
        });

        expect(outputState.summaryView.selectedAlerts.length).toBe(1);
        expect(outputState.summaryView.isFetching).toBe(false);
    });
});














