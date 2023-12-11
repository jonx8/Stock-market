<script lang="ts" setup>

import store from "../store";
import Active from "@/types/Active";
import ChartDialog from "@/components/ChartDialog.vue";
import BuyStocksDialog from "@/components/BuyStocksDialog.vue";
import SellStocksDialog from "@/components/SellStocksDialog.vue";

const props = defineProps<{ active: Active }>();

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
    return getPrice(symbol) * props.active.quantity - props.active.price;
}


</script>

<template>
    <v-card>
        <v-card-item>
            <v-card-title>
                {{ active.symbol }}
            </v-card-title>
            <v-card-subtitle>
                {{ active.company }}
            </v-card-subtitle>
            <v-card-text>
                <p class="font-weight-medium">
                    Куплено: {{ active.quantity }}
                </p>
                <p class="font-weight-medium">
                    Доступно для покупки: {{ getAvailableStocksCount(active.symbol) }}
                </p>
                <p class="font-weight-medium">
                    Цена акции: <span class="price-label">{{ getPrice(active.symbol) }}</span>
                </p>
                <p class="font-weight-medium">
                    Текущий доход:
                    <span :class="getProfit(active.symbol) > 0 ? 'text-green': 'text-red'">
                         {{ getProfit(active.symbol).toFixed(2) }}
                    </span>
                </p>
            </v-card-text>
            <v-card-actions>
                <ChartDialog :symbol="active.symbol">
                    Открыть график
                </ChartDialog>
                <BuyStocksDialog :active="active"/>
                <SellStocksDialog :active="active"/>
            </v-card-actions>

        </v-card-item>
    </v-card>
</template>

<style scoped>

</style>
