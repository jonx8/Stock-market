import {StockInfo} from "./stocksSlice";
import React from "react";
import {Button, Input, TableCell, TableRow} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";

interface StockRecordProps {
    stock: StockInfo
}

export default function StockRecord(props: StockRecordProps) {
    const navigate: NavigateFunction = useNavigate();

    return (
        <TableRow>
            <TableCell>{props.stock.symbol}</TableCell>
            <TableCell>{props.stock.company}</TableCell>
            <TableCell>{props.stock.quantity}</TableCell>
            <TableCell sx={{
                textAlign: 'center'
            }}>
                <Input type={'checkbox'}/>
            </TableCell>
            <TableCell align={"right"}>
                <Button onClick={() => {
                    navigate(`/stocks/${props.stock.symbol}`);
                }}>
                    Посмотреть историю
                </Button>
            </TableCell>
        </TableRow>
    )
}