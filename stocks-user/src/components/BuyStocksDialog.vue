<script lang="ts">
import {defineComponent} from 'vue'
import store from "../store";
import {io} from "socket.io-client";
import BuyStockDto from "@/types/BuyStockDto";
import Active from "@/types/Active";

export default defineComponent({
    name: "BuyStocksDialog",
    computed: {
        store() {
            return store;
        }
    },
    methods: {
        buyStock() {
            const socket = io('http://localhost:3000/bidding');
            const data: BuyStockDto = {
                brokerId: store.state.brokerId,
                symbol: this.active.symbol,
                quantity: parseInt(this.quantityToBuy)
            }
            const availableToBuy = store.state.stocks.get(this.active.symbol)?.quantity;
            if (availableToBuy == null) {
                return
            }
            if (data.quantity > 0 && data.quantity <= availableToBuy) {
                socket.emit('buyStock', data);
                this.openDialog = false;
                this.error = false;
            } else {
                this.error = true;
            }

        }
    },
    props: {
        active: {
            type: Active,
            required: true,
        },
    },
    data() {
        return {
            error: false,
            openDialog: false,
            quantityToBuy: '0'
        }
    },
})
</script>

<template>
    <v-btn @click="() => {openDialog = true}" color="primary" class="border-sm">
        Купить
    </v-btn>
    <v-dialog class="w-25" v-model="openDialog">
        <v-card>
            <v-card-title>
                Покупка акций
            </v-card-title>
            <v-card-text>
                <p>Цена: <span id="stock-price">{{ store.state.stocksPrices.get(active.symbol)?.price }}</span></p>
                <p>
                    Доступно для покупки: {{ store.state.stocks.get(active.symbol)?.quantity }}
                </p>
                <v-form class="mt-5">
                    <p class="text-red" v-show="error"> Некорректное количество акций</p>
                    <v-text-field id="quantity-field" label="Количество" type="number" v-model="quantityToBuy"/>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn class="border-sm" @click="buyStock" color="primary">Купить</v-btn>
                <v-btn class="border-sm" @click="() => {openDialog = false}" color="primary">Закрыть</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

