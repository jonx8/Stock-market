<script setup lang="ts">
import store from "@/store";
import BrokerCard from "@/components/BrokerCard.vue";
import BrokersService from "@/services/BrokersService";
import StocksService from "@/services/StocksService";
import {onMounted} from "vue";

onMounted(async () => {
    const brokers = await BrokersService.fetchBrokers();
    store.commit("updateBrokerId", parseInt(localStorage.getItem('id') ?? '-1'));
    store.commit('updateBrokers', brokers);
    store.commit('updateStocks', await StocksService.fetchStocksList())
})

</script>

<template>
    <v-container class="brokers-list mt-lg-15">
        <BrokerCard class="mb-lg-5 w-75"
                    :key="broker.id"
                    :broker="broker"
                    v-for="broker in store.state.brokers.values()"
        />
    </v-container>
</template>

<style scoped>
.brokers-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 20px;
}

.brokers-list * {
    justify-self: center;
}
</style>
