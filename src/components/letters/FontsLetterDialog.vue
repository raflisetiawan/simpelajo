<script setup>
import { useLetterStore } from "../../stores/letter"
const letterStore = useLetterStore();
const changeFont = (font) => {
    document.execCommand("fontName", "Arial", font);
    letterStore.setIsFontsDialog();
}
</script>

<template>
    <q-dialog v-model="letterStore.$state.isFontsDialog">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6" @click="letterStore.setIsFontsDialog()">Fonts</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <template v-for="font in letterStore.$state.fonts">
                    <q-btn :label="font" @click="changeFont(font)" class="q-ma-xs" />
                </template>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>