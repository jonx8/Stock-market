import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";

import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {fetchHistoryData} from "./stocksAPI";
import PricesChart from "./prices-chart";

const HistoryData = () => {
    const {symbol} = useParams();
    const [dates, setDates] = useState([] as string[]);
    const [stockPrices, setStockPrices] = useState([] as number[]);
    const [isChart, setIsChart] = useState(true);
    if (symbol) {
        fetchHistoryData(symbol).then((res) => {
            setDates(res.dates.reverse());
            setStockPrices(res.prices.reverse());
        });
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "50px"
        }}>
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Исторические данные
            </Typography>

            <Typography component="h4" variant="h6" color="primary" gutterBottom style={{marginTop: '20px'}}>
                {symbol}
            </Typography>
            <Button variant="contained" sx={{
                alignSelf: 'flex-end',
            }} onClick={() => setIsChart(!isChart)}>
                {isChart ? 'Таблица' : 'График'}
            </Button>
            <Box style={{width: '80%'}}>
                {isChart
                    ? <PricesChart
                        labels={dates}
                        datasets={[{
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: stockPrices,
                        }]}
                    />
                    : <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Дата</TableCell>
                                <TableCell>Цена,$</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dates.map((date, index) => {
                                return (
                                    <TableRow key={date}>
                                        <TableCell>{dates[dates.length - 1 - index]}</TableCell>
                                        <TableCell>{stockPrices[dates.length - 1 - index]}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                }
            </Box>
        </Box>
    );
};

export default HistoryData;