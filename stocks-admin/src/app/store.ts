import {configureStore} from '@reduxjs/toolkit';
import brokersReducer from '../features/brokers/brokersSlice'
import stockReducer from '../features/stocks/stocksSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'


export const store = configureStore({
    reducer: {
        brokers: brokersReducer,
        stocks: stockReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector