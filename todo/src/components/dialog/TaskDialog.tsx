import React from 'react';
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
    taskDescription?: string;
    taskStatus?: string;
    taskId?: number;
}

function TaskDialog(props: TaskDialogProps) {
    const {onClose, open} = props;
    const [status, setStatus] = React.useState(props.taskStatus);
    const [taskName, setName] = React.useState(props.taskName);
    const [description, setDescription] = React.useState(props.taskDescription);
    const [id, setId] = React.useState(props.taskId);

    const handleClose = () => {
        onClose();
    };

    const handleSelect = (e: any) => {
        setStatus(e);
    };

    const handleName = (e: any) => {
        setName(e);
    };

    const handleDescription = (e: any) => {
        setDescription(e);
    };

    const createTask = () => {
        let body;
        if (id === -1) {
            body = {
                taskName,
                description,
                status,
            } as Task;
            if (props.createTask) {
                props.createTask(body);
            }
        }
        else {
            body = {
                id,
                taskName,
                description,
                status,
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
                    <Input type='text' onChange={(e) => handleName(e.target.value)} value={taskName}/>
                    <label className={'__labels'}>Task Description:</label>
                    <Input type='text' onChange={(e) => handleDescription(e.target.value)} value={description}/>
                    <label className={'__labels'}>Task Status:</label>
                    <Select
                        value={status}
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
