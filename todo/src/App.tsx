import React from 'react';
import './App.css';
import configureStore from "./store/configureStore";
import {getTasks} from "./redux/task/actions";

const store = configureStore();

class App extends React.Component {
    constructor(props: any){
        super(props);
    }

    componentDidMount(){
        store.dispatch(getTasks(0));
    }

    render() {
        return (
            <div>alma</div>
        );
    }
}

export default App;
