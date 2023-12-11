<script setup lang="ts">
import Broker from "@/types/Broker";
import store from "../store";

const props = defineProps<{ broker: Broker }>()

function getPrice(symbol: string): number {
    return store.state.stocksPrices.get(symbol)?.price ?? 0;
}

function getAvailableStocksCount(symbol: string): number {
    return store.state.stocks.get(symbol)?.quantity ?? 0
}

function getProfit(symbol: string) {
    if (getPrice(symbol) === 0) {
        return 0;
    }
    const active = props.broker.actives.find(active => active.symbol === symbol);
    const quantity = active?.quantity ?? 0;
    const price = active?.price ?? 0;
    return getPrice(symbol) * quantity - price;
}
</script>

<template>
    <v-card height="400px" class="overflow-auto d-flex align-center flex-column">
        <v-card-title>
            {{ broker.username }}
        </v-card-title>
        <v-card-subtitle class="font-weight-bold">
            Баланс: {{ broker.balance.toFixed(2) }}
        </v-card-subtitle>
        <v-card-item class="d-flex justify-center w-100">
            <h4 class="text-center mt-5">Активы</h4>
            <v-list class="d-flex ma-lg-5">
                <v-list-item class=""
                             v-for="active in broker.actives"
                             :key="active.symbol">
                    <v-list-item-title class="font-weight-bold">
                        {{ active.symbol }}:
                    </v-list-item-title>
                    <p>Куплено: {{ active.quantity }}</p>
                    <p>Доступно для покупки: {{ getAvailableStocksCount(active.symbol) }}</p>
                    <p> Текущая цена:
                        {{ getPrice(active.symbol).toFixed(2) }}</p>
                    <p>Прибыль: {{ getProfit(active.symbol).toFixed(2) }}</p>
                </v-list-item>
            </v-list>
            <v-card-actions>

            </v-card-actions>

        </v-card-item>
    </v-card>
</template>

<style scoped>
</style>
