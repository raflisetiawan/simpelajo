<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import SignOutButton from './SignOutButton.vue';

const userStore = useUserStore();
const router = useRouter();
</script>

<template>
    <q-btn-dropdown dense flat>
        <q-list>
            <q-item clickable v-close-popup v-if="userStore.$state.user.role === 'officer'"
                @click="router.push({ name: 'Officer' })">
                <q-item-section>
                    <q-item-label>
                        Petugas
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-close-popup v-else-if="userStore.$state.user.role === 'admin'"
                @click="router.push({ name: 'Admin' })">
                <q-item-section>
                    <q-item-label>
                        Admin
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="router.push({ name: 'Home' })">
                <q-item-section>
                    <q-item-label>
                        Home
                    </q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
                <q-item-section>
                    <q-item-label>
                        <SignOutButton />
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>
</template>