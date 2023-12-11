import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NewBrokerDialog from "./new-broker-dialog";
import {addBroker, BrokerInfo, deleteBroker, getBrokers, selectBrokers} from "./brokersSlice";
import BrokerRecord from "./broker-record";
import {useAppDispatch, useAppSelector} from "../../app/store";


function BrokersList() {
    const [openDialog, setOpenDialog] = useState(false);
    const brokers = useAppSelector(selectBrokers);
    const brokersStatus = useAppSelector(state => state.brokers.status);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (brokersStatus === 'idle') {
            dispatch(getBrokers())
        }
    }, [brokersStatus, dispatch])
    const handleAddBrokerClick = () => {
        setOpenDialog(true)
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "50px"
        }}>
            <NewBrokerDialog onClose={handleCloseDialog} onSend={(newBroker: BrokerInfo) => {
                dispatch(addBroker(newBroker))
            }} isOpen={openDialog}/>


            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Брокеры
            </Typography>
            <Button variant="contained" sx={{
                alignSelf: 'flex-end',
                position: 'absolute',
                margin: 1,
            }} onClick={handleAddBrokerClick}>Добавить</Button>
            <Table sx={{
                width: "80%",
                marginTop: "3em"
            }}>
                <TableHead>
                    <TableRow sx={{fontWeight: 700}}>
                        <TableCell sx={{fontWeight: 'inherit'}}>ID</TableCell>
                        <TableCell sx={{fontWeight: 'inherit'}}>Имя</TableCell>
                        <TableCell sx={{fontWeight: 'inherit'}}>Баланс</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {brokers.map((broker: BrokerInfo) => (
                        <BrokerRecord
                            key={broker.id}
                            broker={broker}
                            deleteCallBack={() => {
                                dispatch(deleteBroker(broker.id));
                            }}/>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}


export default BrokersList;
