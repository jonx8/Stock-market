import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import React, {FC, useState} from 'react';
import {createBrokerRequest} from "./brokersAPI";

interface NewBrokerDialogProps {
    isOpen: boolean,
    onClose: any,
    onSend: any
}


const NewBrokerDialog: FC<NewBrokerDialogProps> = (props: NewBrokerDialogProps) => {
    const [formState, setFormState] = useState({
        username: '',
        balance: 0
    })


    async function onSubmitForm() {
        if (formState.username.length < 4 || !formState.balance) {
            return;
        }
        const newBroker = await createBrokerRequest({
            username: formState.username,
            balance: formState.balance,
        });
        props.onSend(newBroker);
        setFormState({username: '', balance: 0});
        props.onClose();
    }

    return (
        <Dialog open={props.isOpen} onClose={props.onClose}>
            <DialogTitle>Новый брокер</DialogTitle>
            <DialogContent>
                <form>
                    <TextField onChange={event => {
                        setFormState({
                            ...formState,
                            username: event.target.value
                        })
                    }}
                               autoFocus
                               margin="dense"
                               id="username-field"
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
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        type='number'
                        label="Баланс"
                        variant="standard"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={props.onClose}>Отмена</Button>
                <Button variant='contained' onClick={onSubmitForm}>Добавить</Button>
            </DialogActions>
        </Dialog>

    );
}
export default NewBrokerDialog;