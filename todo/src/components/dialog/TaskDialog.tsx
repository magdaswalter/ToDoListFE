import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {Dialog} from "@material-ui/core";

import './task-dialog.scss';
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import {Task} from "../../interfaces/task.type";

export interface TaskDialogProps {
    open: boolean;
    onClose: () => void;
    createTask?: (body: Task) => void;
    updateTask?: (body: Task) => void;
    taskName?: string;
    description?: string;
    status?: string;
    id?: number;
}

function TaskDialog(props: TaskDialogProps) {
    const initialState = {
        id: props.id,
        taskName: props.taskName,
        description: props.description,
        status: props.status
    };
    const {onClose, open} = props;
    const [taskState, setTaskState] = React.useState(initialState);

    useEffect(() => {
        if (props.id !== taskState.id || props.taskName !== taskState.taskName) {
            setTaskState(
                {
                    taskName: props.taskName,
                    id: props.id,
                    description: props.description,
                    status: props.status
                }
                );
        }
    }, [props.taskName, props.id, props.status, props.description]);

    const handleClose = () => {
        onClose();
    };

    const handleSelect = (e: any) => {
        setTaskState((prevState) => ({
            ...prevState,
            status: e
    }));
    };

    const handleName = (e: any) => {
        setTaskState((prevState) => ({
            ...prevState,
            taskName: e
        }));
    };

    const handleDescription = (e: any) => {
        setTaskState((prevState) => ({
            ...prevState,
            description: e
        }));
    };

    const createTask = () => {
        let body;
        //creating body for task creation
        if (taskState.id === -1) {
            body = {
                taskName: taskState.taskName,
                description: taskState.description,
                status: taskState.status,
            } as Task;
            if (props.createTask) {
                props.createTask(body);
            }
        }
        else {
            //creating body for task update
            body = {
                id: taskState.id,
                taskName: taskState.taskName,
                description: taskState.description,
                status: taskState.status,
            } as Task;
            if (props.updateTask) {
                props.updateTask(body);
            }
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <form onSubmit={createTask}>
                <div className={'container'}>
                    <label className={'__labels'}>Task Name:</label>
                    <Input type='text' onChange={(e) => handleName(e.target.value)} value={taskState.taskName}/>
                    <label className={'__labels'}>Task Description:</label>
                    <Input type='text' onChange={(e) => handleDescription(e.target.value)} value={taskState.description}/>
                    <label className={'__labels'}>Task Status:</label>
                    <Select
                        value={taskState.status}
                        onChange={(e) => handleSelect(e.target.value)}
                    >
                        <MenuItem value={'created'}>Created</MenuItem>
                        <MenuItem value={'inProgress'}>In Progress</MenuItem>
                        <MenuItem value={'closed'}>Closed</MenuItem>
                    </Select>
                </div>
                <div className={'button-group'}>
                    <Button className={'__margin'} variant={'contained'} onClick={handleClose}>Cancel</Button>
                    <input className={'__create-button'} type={'submit'}/>
                </div>
            </form>
        </Dialog>
    );
}

export default TaskDialog;
