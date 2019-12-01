import reducer from './reducers';
import initialState from '../initialState';
import * as types from './types';


describe('Task reducer', () => {

    const TEST_STATE = {
        tasks: [
            {
                id: 0,
                taskName: 'first',
                description: '',
                status: ''
            },
            {
                id: 1,
                taskName: 'second',
                description: '',
                status: ''
            },
            {
                id: 2,
                taskName: 'third',
                description: '',
                status: ''
            }
        ],
        paginationDetails: {
            totalPages: 1,
            totalElements: 3,
            actualPage: 0
        }
    };

    const deletedTasks = [
        {
            id: 1,
            taskName: 'second',
            description: '',
            status: ''
        },
        {
            id: 2,
            taskName: 'third',
            description: '',
            status: ''
        }
    ];

    const updatedTask = [
        {
            id: 0,
            taskName: 'first',
            description: '',
            status: ''
        },
        {
            id: 1,
            taskName: 'fourth',
            description: 'created',
            status: 'closed'
        },
        {
            id: 2,
            taskName: 'third',
            description: '',
            status: ''
        }
    ];


    it('should return the initial state', () => {
        const outputState = reducer(initialState, {type: 'TEST_ACTION'});
        expect(outputState).toBe(initialState);
    });

    it('should handle GET_TASKS_SUCCESS', function () {
        const reducerTest = reducer(TEST_STATE, {
            type: types.GET_TASKS_SUCCESS, tasks: TEST_STATE.tasks,
            paginationDetails: TEST_STATE.paginationDetails
        });

        expect(reducerTest).toEqual({
            tasks: TEST_STATE.tasks,
            paginationDetails: TEST_STATE.paginationDetails
        })
    });

    it('should handle DELETE_TASKS_SUCCESS', function () {
        const reducerTest = reducer(TEST_STATE, {
            type: types.DELETE_TASKS_SUCCESS, stateId: 0,
            tasks: TEST_STATE.tasks, paginationDetails: TEST_STATE.paginationDetails
        });

        expect(reducerTest).toEqual({
            tasks: deletedTasks,
            paginationDetails: TEST_STATE.paginationDetails
        })
    });

    it('should handle UPDATE_TASKS_SUCCESS', function () {
        const updateTask = {
            id: 1,
            taskName: 'fourth',
            description: 'created',
            status: 'closed'
        };
        const reducerTest = reducer(TEST_STATE, {
            type: types.UPDATE_TASKS_SUCCESS, task: updateTask, index: 1,
            tasks: TEST_STATE.tasks, paginationDetails: TEST_STATE.paginationDetails
        });

        expect(reducerTest).toEqual({
            tasks: updatedTask,
            paginationDetails: TEST_STATE.paginationDetails
        })
    });

});
