import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import StockRecord from "./stock-record";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getStocks, selectStocks, StockInfo} from "./stocksSlice";


const StocksList = () => {
    const stocks = useAppSelector(selectStocks);
    const stocksStatus = useAppSelector(state => state.stocks.status);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (stocksStatus === 'idle') {
            dispatch(getStocks());
        }
    }, [stocksStatus, dispatch])

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "50px"
        }}>
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Акции
            </Typography>
            <Table sx={{
                width: "80%",
                marginTop: "3em"
            }}>
                <TableHead>
                    <TableRow sx={{fontWeight: 700}}>
                        <TableCell sx={{fontWeight: "inherit"}}>Символ</TableCell>
                        <TableCell sx={{fontWeight: "inherit"}}>Компания</TableCell>
                        <TableCell sx={{fontWeight: "inherit"}}>Количество</TableCell>
                        <TableCell sx={{
                            fontWeight: 'inherit',
                            textAlign: 'center'
                        }}>Включение в торги</TableCell>
                        <TableCell sx={{fontWeight: "inherit"}} align='right'/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map((stock: StockInfo) => (
                        <StockRecord key={stock.symbol} stock={stock}/>
                    ))}
                </TableBody>
            </Table>
        </Box>

    )
        ;
};

export default StocksList;