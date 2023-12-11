<template>
    <v-container class="fill-height">
        <v-sheet min-width="50%" class="mx-auto d-flex flex-column align-center">
            <h1 class="login-headline">
                Вход
            </h1>

            <v-form @submit.prevent="sendForm"
                    class="w-100 d-flex flex-column align-center" id="login-form">
                <v-text-field v-model="usernameFieldValue" color="primary" class="w-33" label="Имя пользователя"/>
                <v-btn color="primary" type="submit" class="mt-2" text="Войти"/>
            </v-form>
        </v-sheet>
    </v-container>

</template>

<script lang="ts" setup>
import AuthService from "@/services/AuthService";
import AuthResponseDto from "@/types/AuthResponseDto";
import router from "@/router";
import store from "@/store";

let usernameFieldValue: string = "";

async function sendForm() {
    const res: AuthResponseDto = await AuthService.loginRequest(usernameFieldValue);
    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem("id", String(res.broker.id));
    store.commit("setAuthStatus", true);
    await router.push({path: '/profile'});
}

</script>

<style scoped>
.login-headline {
    color: #823a68;
    padding-bottom: 5rem;
}

#login-form {
    padding-bottom: 15rem;
}
</style>
