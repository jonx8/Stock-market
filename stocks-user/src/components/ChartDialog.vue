<script lang="ts">

import {Line as LineChart} from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from 'chart.js'
import StocksService from "@/services/StocksService";
import store from "@/store";
import {io} from "socket.io-client";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend)
export default {
    props: {
        symbol: String
    },
    data() {
        return {
            dialogOpened: false,
            chartData: {
                labels: [] as string[],
                datasets: [
                    {
                        label: 'Цена, $',
                        backgroundColor: '#ff0088',
                        data: [] as number[]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        openDialog() {
            this.dialogOpened = true;
        },

        closeDialog() {
            this.dialogOpened = false;
        },
        async fetchData() {
            if (this.$props.symbol == null) {
                return
            }
            const data = await StocksService.fetchHistoryData(this.$props.symbol);
            data.dates = data.dates.filter((date: string) => {
                return new Date(date) < store.state.currentDate;
            }).reverse();
            data.prices = data.prices.slice(0, data.dates.length).reverse();
            this.chartData = {
                labels: data.dates.slice(-20),
                datasets: [{
                    ...this.chartData.datasets[0],
                    data: data.prices
                }]
            }
        }
    },
    components: {LineChart},
    async mounted() {
        await this.fetchData();
        const socket = io('http://localhost:3000/bidding');
        socket.on('updatePrices', this.fetchData);


    },

}

</script>


<template>
    <v-btn @click="openDialog" color="primary" class="border-sm">
        <slot></slot>
    </v-btn>

    <v-dialog class="h-75" v-model="dialogOpened">
        <v-card>
            <v-card-title>
                {{ 'График ' + $props.symbol }}
            </v-card-title>

            <LineChart ref='chart' :data="chartData" :options="options" class="pa-10"/>

            <v-card-actions class="mt-5">
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    class="border-sm"
                    text="Закрыть"
                    @click='closeDialog'
                ></v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<style scoped>

</style>
