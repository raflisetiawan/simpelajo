<script setup lang="ts">
import { useFormStore } from "../../stores/form";
import { ref } from "vue";

const props = defineProps(['label', 'index', 'required', 'modelValue', 'title', 'size', 'select']);
const formStore = useFormStore()
const isValidateImage = ref(false);
const onRejected = () => {
    isValidateImage.value = true;
}
const formName: any = formStore.$state.forms[props.index];
</script>
<template>
    <q-file v-model="formName.name" :label="title" bottom-slots accept="image/jpeg,.png,.jfif,.jpg"
        :error="isValidateImage" @rejected="onRejected" @click="isValidateImage = false">
        <template v-slot:error>
            File tidak valid
        </template>
        <template v-slot:prepend>
            <q-icon name="cloud_upload" />
        </template>
    </q-file>
</template>