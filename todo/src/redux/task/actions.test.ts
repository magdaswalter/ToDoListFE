import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import {createTask, getTasks, httpToDo} from './actions';
import * as types from './types';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
jest.spyOn(window, 'alert').mockImplementation(() => {
});

const getTaskResponse = [
    {
        content: [
            {
                status: 'progress',
                description: 'desc',
                taskName: 'Name',
                id: 0
            },
            {
                status: 'progress',
                description: 'desc',
                taskName: 'Name',
                id: 1
            }],
        pageable: {},
        totalPages: 1,
        totalElements: 2,
        last: false,
        size: 0,
        number: 0,
        numberOfElements: 0,
        first: false,
        empty: false

    }
];

const getResponse = {
    tasks: [
        {
            status: 'progress',
            description: 'desc',
            taskName: 'Name',
            id: 0
        },
        {
            status: 'progress',
            description: 'desc',
            taskName: 'Name',
            id: 1
        }
    ],
    paginationDetails: {
        totalPages: 1,
        totalElements: 2,
        actualPage: 0
    }

};

const createResponse = {
    task:
        {
            status: 'progress',
            description: 'desc',
            taskName: 'Name',
            id: 2
        }
};


describe('Tasks Actions', () => {

    describe('getTasks', () => {
        it('should get tasks', (done) => {
            const expectedActions = [
                {type: types.GET_TASKS_REQUEST},
                {type: types.GET_TASKS_SUCCESS, ...getResponse},
            ];

            const mock = new MockAdapter(httpToDo);
            mock.onGet().reply(200, getTaskResponse);
            const store = mockStore({storeContent: []});
            store.dispatch(actions.getTasks(0))
                .then((response: any) => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                })
        });
    });

    describe('createTasks', () => {
        const createBody = {
            status: 'progress',
            description: 'desc',
            taskName: 'Name',
            id: 2
        };
        it('should create task', (done) => {
            const expectedActions = [
                {type: types.CREATE_TASKS_REQUEST},
                {type: types.CREATE_TASKS_SUCCESS, ...createResponse},
            ];

            const mock = new MockAdapter(httpToDo);
            mock.onPost().reply(200, createBody);
            const store = mockStore({storeContent: []});
            store.dispatch(actions.createTask(createBody))
                .then((response: any) => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                })
        });
    });

    describe('deleteTask', () => {
        it('should delete tasks', (done) => {
            const expectedActions = [
                {type: types.DELETE_TASKS_REQUEST},
                {type: types.DELETE_TASKS_SUCCESS, stateId: 0},
            ];

            const mock = new MockAdapter(httpToDo);
            mock.onDelete().reply(200, 0);
            const store = mockStore({storeContent: []});
            store.dispatch(actions.deleteTask(0, 0))
                .then((response: any) => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                })
        });
    });

});
