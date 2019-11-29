import React from 'react';
import './app.scss';
import configureStore from "./store/configureStore";
import {getTasks} from "./redux/task/actions";
import ToDo from "./components/to-do/ToDo";
import {Provider} from "react-redux";

const store = configureStore();


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        store.dispatch(getTasks(0));
    }

    // if (((alma.paginationDetails.totalPages - 1) === alma.paginationDetails.actualPage) &&
    //     ((alma.paginationDetails.totalElements % 6) !== 0)) {
    //     store.dispatch(createTask({description: 'testdecs', taskName: 'test'}, true));
    // } else {
    //     store.dispatch(createTask({description: 'testdecs', taskName: 'test'}, false));
    // }
    render() {
        return (
            <Provider store={store}>
                <ToDo/>
            </Provider>
        );
    }
}

export const AppDispatch = store.dispatch;

export default App;
