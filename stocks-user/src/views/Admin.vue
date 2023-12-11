<script setup lang="ts">

import store from "../store";
import BrokersList from "@/components/BrokersList.vue";
</script>

<template>
    <v-container class="d-flex align-center flex-column">
        <h1 class="admin-headline">
            Участники торгов
        </h1>
        <h3>Текущая дата: {{ store.getters.dateString}}</h3>
        <BrokersList/>

    </v-container>
</template>

<style scoped>
h1, h3 {
    color: #823a68;
}
</style>
