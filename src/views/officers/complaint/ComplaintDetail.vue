<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getComplaintById } from "@/services/officers/complaint";
import { useRoute } from "vue-router";
import VueEasyLightbox from "vue-easy-lightbox";

const route: any = useRoute();
const complaint: any = ref(null);
const loading = ref(true);
const imageDialog = () => {
    visible.value = true;
}
const visible = ref(false);
onMounted(async () => {
    complaint.value = await getComplaintById(route.params.id);
    // complaint.value.downloadURL = [`${complaint.value.downloadURL}`]
    loading.value = false;
})
</script>
<template>
    <q-linear-progress indeterminate v-if="loading" />
    <div class="container q-pa-md" v-else>
        <div class="row q-mb-md" v-if="complaint.downloadURL">
            <div class="col-md-12 col-xs-12 col-sm-12 text-center">
                <q-img @click="imageDialog" :src="complaint.downloadURL" spinner-color="primary" class="image" />
                <VueEasyLightbox move-disabled :visible="visible" :imgs="complaint.downloadURL"
                    @hide="visible = false" />
            </div>
        </div>
        <div class="row q-mb-md">
            <div class="col-md-12 col-xs-12 col-sm-12 text-center">
                <div class="text-h6">Nama: {{ complaint.name }}</div>
            </div>
        </div>
        <div class="row q-mb-md">
            <div class="col-md-12 col-xs-12 col-sm-12 text-center">
                <div class="text-h6">Keluhan: {{ complaint.complaint }}</div>
            </div>
        </div>
        <div class="row q-mb-md">
            <div class="col-md-12 col-xs-12 col-sm-12 text-center">
                <div class="text-h6">Saran: {{ complaint.suggestion }}</div>
            </div>
        </div>
    </div>


</template>

<style scoped>
.image {
    max-height: 250px;
    max-width: 500px;
    cursor: pointer;
}

.card-dialog {
    background: transparent;
}
</style>