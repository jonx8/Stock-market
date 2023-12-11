<script lang="ts" setup>
import {onMounted} from "vue";
import store from "@/store"
import BrokersService from "@/services/BrokersService";
import StocksService from "@/services/StocksService";

onMounted(async () => {
    const brokers = await BrokersService.fetchBrokers();
    store.commit("updateBrokerId", parseInt(localStorage.getItem('id') ?? '-1'));
    store.commit('updateBrokers', brokers);
    store.commit('updateStocks', await StocksService.fetchStocksList())
})

</script>

<template>
    <v-card
        class="mx-auto my-8"
        elevation="16"
        width="50%"
    >
        <v-card-item v-if="store.state.brokerId !== -1">
            <v-card-title>
                {{ store.getters.brokerUsername }}
            </v-card-title>
            <v-card-subtitle>
                Баланс: <span id="broker-balance">{{ store.getters.brokerBalance.toFixed(2) }}</span>
            </v-card-subtitle>
        </v-card-item>
        <v-card-item v-else>
            <v-card-title>
                Загрузка...
            </v-card-title>
        </v-card-item>
    </v-card>
</template>
