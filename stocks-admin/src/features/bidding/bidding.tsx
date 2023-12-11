import React, {useState} from 'react';
import {Box, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider,} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru.js';
import Button from "@mui/material/Button";
import {BiddingSettings, startBiddingRequest, stopBiddingRequest} from "./BiddingAPI";


const Bidding = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [formState, setFormState] = useState({
        startDate: new Date(),
        delay: 1
    })

    async function startBidding() {
        const biddingSettings: BiddingSettings = {
            startDate: formState.startDate,
            delay: formState.delay,
        }

        if (await startBiddingRequest(biddingSettings)) {
            setIsStarted(true);
        }
    }


    async function stopBidding() {
        if (await stopBiddingRequest()) {
            setIsStarted(false);
        }

    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "50px"
        }}>
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Настройки торгов
            </Typography>
            <form style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '50px'
            }}>
                <TextField
                    defaultValue={1}
                    onChange={(event) => {
                        setFormState({
                            ...formState,
                            delay: parseInt(event.target.value)
                        })
                    }}
                    autoFocus
                    sx={{margin: '10px'}}
                    label="Скорость смены дат (секунды)"
                    type={'number'}
                    fullWidth
                    variant="standard"
                />

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
                    <DatePicker
                        onChange={(value: any) => {
                            setFormState({
                                ...formState,
                                startDate: value.toDate()
                            });
                        }}
                        label="Начало торгов" sx={{width: '100%', margin: '10px'}}/>
                </LocalizationProvider>
                <Button sx={{margin: '10px'}} variant='contained'
                        onClick={isStarted ? stopBidding : startBidding}>
                    {isStarted ? 'Закончить торги' : 'Начать торги'}
                </Button>

            </form>
        </Box>
    );
};

export default Bidding;