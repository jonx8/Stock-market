import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchStocksList} from "./stocksAPI";

export interface StockInfo {
    company: string,
    symbol: string,
    quantity: number,
    historyFile: string
}


const initialState = {
    value: [] as StockInfo[],
    status: "idle"
};

export const getStocks = createAsyncThunk('stocks/get', fetchStocksList);

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getStocks.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getStocks.fulfilled, (state, action) => {
            state.value = action.payload;
            state.status = 'succeeded';
        });
        builder.addCase(getStocks.rejected, (state) => {
            state.status = 'failed';
        });
    }
});

export const selectStocks = (state: any) => state.stocks.value;
export default stocksSlice.reducer;
