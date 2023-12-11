import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import React, {FC, useState} from 'react';
import {updateBrokerRequest} from "./brokersAPI";
import {BrokerInfo} from "./brokersSlice";

interface UpdateBrokerDialogProps {
    isOpen: boolean,
    onClose: any,
    onSend: any,
    broker: BrokerInfo
}

const UpdateBrokerDialog: FC<UpdateBrokerDialogProps> = (props: UpdateBrokerDialogProps) => {
    const [formState, setFormState] = useState({
        username: props.broker.username,
        balance: props.broker.balance
    });

    async function onSubmitForm() {
        if (formState.username.length < 4 || !formState.balance) {
            return;
        }
        const broker = await updateBrokerRequest(props.broker.id, {
            username: formState.username,
            balance: formState.balance,
        });
        props.onSend(broker);
        setFormState({username: broker.username, balance: broker.balance});
        props.onClose();
    }

    return (
        <Dialog open={props.isOpen}>
            <DialogTitle>
                Изменение данных
            </DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        onChange={event => {
                            setFormState({
                                ...formState,
                                username: event.target.value
                            })
                        }}
                        defaultValue={formState.username}
                        autoFocus
                        margin="dense"
                        label="Имя брокера"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={event => {
                            setFormState({
                                ...formState,
                                balance: parseFloat(event.target.value)
                            })
                        }}
                        defaultValue={formState.balance}
                        autoFocus
                        margin="dense"
                        fullWidth
                        type='number'
                        label="Баланс"
                        variant="standard"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={props.onClose}>Отмена</Button>
                <Button variant='contained' onClick={onSubmitForm}>Обновить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateBrokerDialog;