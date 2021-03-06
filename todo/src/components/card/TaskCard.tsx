import React from 'react';

import './task-card.scss';
import {Task} from "../../interfaces/task.type";
import {Button} from "@material-ui/core";
import TaskDialog from "../dialog/TaskDialog";

interface ITaskCardProps {
    deleteTask: any,
    updateTask: any,
    tasks: Task,
    state: any
}

const initialState = {
    id: 0,
    taskName: '',
    description: '',
    status: ''
};

function TaskCard(props: ITaskCardProps) {
    const [open, setOpen] = React.useState(false);
    const [taskState, setTaskState] = React.useState(initialState);

    function deleteTask (id: number){
        props.state.forEach((value: any, index: number) => {
            if (value.id === id) {
                props.deleteTask(id, index);
            }
        });
    }

    function openDialog(task: Task) {
        setTaskState({
            description: task.description,
            id: task.id,
            taskName: task.taskName,
            status: task.status
        });
        setOpen(true);
    }

    function updateTask(body: Task) {
        props.state.forEach((value:any, index: number) => {
            if (value.id === taskState.id){
                props.updateTask(body, index);
            }
        });
    }

    function handleClose () {
        setOpen(false);
    };

    return (
        <div className={'card'}>
            <div className={'__header'}>
                {props.tasks.taskName}
            </div>
            <div className={'__content'}>
                    <div className={'status-container'}>
                        <label className={'__field'}>Status:</label>
                        <label className={'__text'}>{props.tasks.status}</label>
                    </div>
                    <div className={'description-container'}>
                        <label className={'__field'}>Description:</label>
                        <label className={'__text'}>{props.tasks.description}</label>
                    </div>
            </div>
            <div className={'__footer'}>
                <Button className={'__modify'} variant={'contained'} size={'medium'} color={'primary'} onClick={() => openDialog(props.tasks)}>Modify Task</Button>
                <Button variant={'contained'} size={'medium'} color={'secondary'} onClick={() => deleteTask(props.tasks.id)}>Delete Task</Button>
            </div>
            <TaskDialog taskName={taskState.taskName} description={taskState.description}
                        status={taskState.status} id={taskState.id} open={open} onClose={handleClose}
                        updateTask={updateTask}
            />
        </div>
    );
}

export default TaskCard;
