<template>
    <router-view/>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import store from "@/store";
import {io} from "socket.io-client";
import StockPrice from "@/types/StockPrice";
import Stock from "@/types/Stock";

onMounted(async () => {
    const socketServer = io('http://localhost:3000/bidding');

    socketServer.on('updateBrokers', (payload) => {
        store.commit('updateBrokers', payload)
    });
    socketServer.on('updateStocks', (payload: Stock[]) => {
        store.commit('updateStocks', payload);
    });
    socketServer.on('updatePrices', (data: { date: string, stocksList: StockPrice[] }) => {
        store.commit('updateDate', new Date(data.date))
        store.commit('updatePrices', data.stocksList);
    });
});


</script>
