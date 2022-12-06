<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getServiceBySlug } from "../services/admin/service"
import { getLetterByServiceId } from "../services/admin/letter"

const route: any = useRoute();
const service: any = ref(null);
const letter: any = ref(null);

onMounted(async () => {
    service.value = await getServiceBySlug(route.params.slug);
    letter.value = await getLetterByServiceId(service.value.id);
})
</script>

<template>
    <div class="container">
        <div class="row text-center">
            <div class="full-width text-h5 q-my-sm" v-if="letter != null">{{ letter.data.serviceName }}</div>
        </div>
        <div class="row text-center">
            <div class="col-md-4 full-width q-mb-md">
                <q-btn label="Lihat Form" :to="{ name: 'CreateFormService', params: { slug: route.params.slug } }" />
            </div>
        </div>
        <div class="row text-center" v-if="letter != null">
            <div class="full-width">
                <iframe :width="$q.screen.lt.md ? 300 : 600" height="800"
                    :src="`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(letter.data.downloadURL)}`"
                    frameborder='0'></iframe>
            </div>
        </div>
    </div>
</template>