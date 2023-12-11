<template>

    <v-container class="d-flex align-center flex-column">
        <h1 class="profile-headline">
            Мой профиль
        </h1>
        <h4 class="profile-headline">
            Текущая дата:
            {{ store.getters.dateString }}
        </h4>
        <ProfileCard/>
        <ActivesList/>
    </v-container>
</template>

<script lang="ts" setup>
import ProfileCard from "@/components/ProfileCard.vue";
import ActivesList from "@/components/ActivesList.vue";
import store from "../store";


</script>

<style scoped>
.profile-headline {
    color: #823a68;
    padding-bottom: 1rem;
}
</style>
