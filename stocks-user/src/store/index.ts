import {createStore} from "vuex";
import Broker from "@/types/Broker";
import Stock from "@/types/StockPrice";
import StockPrice from "@/types/StockPrice";

export default createStore({
    state: {
        currentDate: new Date(),
        brokerId: -1,
        brokers: new Map<number, Broker>(),
        stocks: new Map<string, Stock>(),
        stocksPrices: new Map<string, StockPrice>(),
        isAuthenticated: Boolean(localStorage.getItem('id')
            && localStorage.getItem('access_token')),
    },
    getters: {
        brokerUsername: state => state.brokers.get(state.brokerId)?.username,
        brokerBalance: state => state.brokers.get(state.brokerId)?.balance,
        brokerActives: state => state.brokers.get(state.brokerId)?.actives,
        dateString: state => {
            const year: number = state.currentDate.getFullYear();
            const month: number = state.currentDate.getMonth();
            const day: number = state.currentDate.getDate();
            return `${day}.${month + 1}.${year}`;
        }
    },
    mutations: {
        updateDate: (state, payload: Date) => {
            state.currentDate = payload;
        },
        updateStocks: (state, payload: Stock[]) => {
            payload.forEach(stock => {
                state.stocks.set(stock.symbol, stock);
            });
        },
        updatePrices: (state, payload: StockPrice[]) => {
            payload.forEach(stock => {
                state.stocksPrices.set(stock.symbol, stock);
            });
        },
        updateBrokerId: (state, payload: number) =>{
            state.brokerId = payload;
        },
        updateBrokers: (state, payload: Broker[]) => {
            payload.forEach(broker => {
                state.brokers.set(broker.id, broker);
            });
        },
        setAuthStatus:
            (state, payload: boolean) => {
                state.isAuthenticated = payload;
            }
    },
})
