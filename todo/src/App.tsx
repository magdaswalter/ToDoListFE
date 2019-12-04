import React from 'react';
import './app.scss';
import configureStore from "./store/configureStore";
import {getTasks} from "./redux/task/actions";
import ToDo from "./components/to-do/ToDo";
import {Provider} from "react-redux";

const store = configureStore();


class App extends React.Component<any, any> {

    componentDidMount() {
        store.dispatch(getTasks(0));
    }

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
