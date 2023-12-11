<script lang="ts">
import {defineComponent} from 'vue'
import store from "../store";
import {io} from "socket.io-client";
import SellStockDto from "@/types/SellStockDto";
import Active from "@/types/Active";


export default defineComponent({
    name: "SellStocksDialog",
    computed: {
        store() {
            return store;
        }
    },
    methods: {
        sellStock() {
            const socket = io('http://localhost:3000/bidding');
            const data: SellStockDto = {
                brokerId: store.state.brokerId,
                symbol: this.active.symbol,
                quantity: parseInt(this.quantityToSell)
            }
            if (data.quantity > 0 && this.active.quantity >= data.quantity) {
                socket.emit('sellStock', data);
                this.openDialog = false;
                this.error = false;
            } else {
                this.error = true;
            }
        },
    },
    props: {
        active: {
            type: Active,
            required: true
        },
    },
    data() {
        return {
            error: false,
            openDialog: false,
            quantityToSell: '0'
        }
    },

})
</script>

<template>
    <v-btn @click="() => {openDialog = true}" color="primary" class="border-sm">
        Продать
    </v-btn>
    <v-dialog class="w-25" v-model="openDialog">
        <v-card>
            <v-card-title>
                Продажа акций
            </v-card-title>
            <v-card-text>
                <p>Цена: {{ store.state.stocksPrices.get(active.symbol)?.price }}</p>
                <p>
                    Доступно для продажи: {{ active.quantity }}
                </p>
                <v-form class="mt-5">
                    <p class="text-red" v-show="error">Некорректное количество акций</p>
                    <v-text-field label="Количество" type="number" v-model="quantityToSell"/>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn class="border-sm" @click="sellStock" color="primary">Продать</v-btn>
                <v-btn class="border-sm" @click="() => {openDialog = false}" color="primary">Закрыть</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>
