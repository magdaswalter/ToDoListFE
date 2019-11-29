import React from 'react';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {Button} from "@material-ui/core";

import './to-do.scss';
import TaskCard from "../card/TaskCard";
import {Task} from "../../interfaces/task.type";
import {getTasks, deleteTask, createTask, updateTask} from "../../redux/task/actions";
import {AppDispatch} from "../../App";
import Pagination from "../pagination/Pagination";
import TaskDialog from "../dialog/TaskDialog";

interface IToDoState {
    open: boolean;
    taskName: string;
    description: string;
    status: string;
}

interface IToDoProps {
    tasks: any;
}

class ToDo extends React.Component<IToDoProps, IToDoState> {
    constructor(props: IToDoProps) {
        super(props);
        this.state = {
            open: false,
            taskName: '',
            description: '',
            status: ''
        };
        this.createTask = this.createTask.bind(this);
    }

    createTask (body: Task) {
        //checking if we are on the last page
        if (((this.props.tasks.paginationDetails.totalPages - 1) === this.props.tasks.paginationDetails.actualPage) &&
            ((this.props.tasks.paginationDetails.totalElements % 6) !== 0)) {
            AppDispatch(createTask(body, true));
        } else {
            AppDispatch(createTask(body, false));
        }
    }

    deleteTask(id: number, index: number) {
        AppDispatch(deleteTask(id, index));
    }

    updateTask(body: Task, index: number) {
        AppDispatch(updateTask(body, index));
    }

    setupCards(tasks: any) {
        return tasks.map((key: Task) => {
            return <TaskCard deleteTask={this.deleteTask} updateTask={this.updateTask} state={tasks} tasks={key}/>
        });
    }

    handlePagination(newPage: number) {
        AppDispatch(getTasks(newPage));
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        let card = this.setupCards(this.props.tasks.tasks);
        return (
            <div>
                <div className={'header'}>
                    <Button className={'__create-button'} variant={'contained'} onClick={() => {
                        this.handleClickOpen()
                    }}>Create New Task</Button>
                </div>
                <div className={'content'}>
                    {card}
                </div>
                <Pagination
                    paginationV={this.props.tasks.paginationDetails}
                    changePage={this.handlePagination.bind(this)}
                />
                <TaskDialog open={this.state.open} onClose={this.handleClose} createTask={this.createTask} taskId={-1}
                />
            </div>
        )
    }

}

export const mapStateToProps = (state: any) => ({
    tasks: get(state, 'task')
});

export default connect(mapStateToProps)(ToDo)
