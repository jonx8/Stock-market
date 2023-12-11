import React, {FC, useState} from 'react';
import {TableCell, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteBrokerRequest} from "./brokersAPI";
import {BrokerInfo, updateBroker} from "./brokersSlice";
import UpdateBrokerDialog from "./update-broker-dialog";
import {useAppDispatch} from "../../app/store";


interface BrokerRecordProps {
    broker: BrokerInfo,
    deleteCallBack: any
}


const BrokerRecord: FC<BrokerRecordProps> = (props: BrokerRecordProps) => {
    const dispatch = useAppDispatch();

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <UpdateBrokerDialog
                onClose={() => {
                    setOpenDialog(false);
                }}
                onSend={(broker: BrokerInfo) => {
                    dispatch(updateBroker(broker));
                }}
                isOpen={openDialog} broker={props.broker}/>
            <TableRow onClick={() => {
                setOpenDialog(true)
            }}>
                <TableCell>{props.broker.id}</TableCell>
                <TableCell>{props.broker.username}</TableCell>
                <TableCell>{props.broker.balance}</TableCell>
                <TableCell align='right'>
                    <IconButton onClick={async () => {
                        const res = await deleteBrokerRequest(props.broker.id);
                        if (res.ok) {
                            props.deleteCallBack(props.broker.id);
                        }
                    }}>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    )
};

export default BrokerRecord;