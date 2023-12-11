import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchBrokersList} from "./brokersAPI";

export interface BrokerInfo {
    id: number,
    username: string,
    balance: number,
    actives: object[]
}


const initialState = {
    value: [] as BrokerInfo[],
    status: "idle"
};

export const getBrokers = createAsyncThunk('brokers/get', fetchBrokersList);

export const brokersSlice = createSlice({
    name: 'brokers',
    initialState: initialState,
    reducers: {
        addBroker: (state, action) => {
            state.value.push(action.payload);
        },
        updateBroker: (state, action) => {
            const index: number = state.value.findIndex(broker => {
                return broker.id === action.payload.id;
            })
            if (index === -1) {
                throw new Error(`Broker with id ${action.payload.id} does not exist`);
            }
            state.value.splice(index, 1, action.payload);
        },
        deleteBroker: (state, action) => {
            state.value = state.value.filter(broker => broker.id !== action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(getBrokers.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getBrokers.fulfilled, (state, action) => {
            state.value = action.payload;
            state.status = 'succeeded';
        });
        builder.addCase(getBrokers.rejected, (state) => {
            state.status = 'failed';
        });
    }
});

export const {addBroker, deleteBroker, updateBroker} = brokersSlice.actions;
export const selectBrokers = (state: any) => state.brokers.value;
export default brokersSlice.reducer;
