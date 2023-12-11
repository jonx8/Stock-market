<template>
    <v-toolbar color="primary" density="comfortable">
        <v-menu v-if="store.state.isAuthenticated">
            <template v-slot:activator="{ props }">
                <v-app-bar-nav-icon v-bind="props"/>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in menuItems"
                    :key="item.title"
                    :value="index"
                    :to="item.path"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-toolbar-title>Биржа акций</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="store.state.isAuthenticated" @click="logout" icon>
            <v-icon>mdi-export</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script lang="ts" setup>
import router from "@/router";
import store from "@/store";

const menuItems = [
    {
        title: 'Профиль',
        path: '/profile'
    },
    {
        title: 'Торги',
        path: '/bidding'
    }
]

async function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    store.commit("setAuthStatus", false);
    await router.push('/login');
}

</script>
