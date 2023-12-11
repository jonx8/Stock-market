<script setup lang="ts">
import ActiveCard from "@/components/ActiveCard.vue";
import store from "@/store";
</script>

<template>
    <v-container class="actives-list">
        <ActiveCard class="mb-lg-5 w-75"
                    :key="active.symbol"
                    :active="active"
                    v-for="active in store.getters.brokerActives"
        />
    </v-container>
</template>

<style scoped>
.actives-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 20px;
}

.actives-list * {
    justify-self: center;
}
</style>
