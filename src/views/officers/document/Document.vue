<script setup async lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getDocument } from "@/services/officers/document";
import { getService } from "@/services/admin/service"
import { useDialogStore } from "@/stores/dialogs";
import LetterNumberDialog from "../LetterNumberDialog.vue";
import StatusDialog from "../StatusDialog.vue";
import { getLetterByServiceId } from "@/services/admin/letter";
import SendViaDialog from "../SendViaDialog.vue";

const dialogStore = useDialogStore();
const route: any = useRoute();
const document: any = ref(null);
const service: any = ref(null);
const letter: any = ref(null);

document.value = await getDocument(route.params.id);
service.value = await getService(document.value.serviceId);
letter.value = await getLetterByServiceId(document.value.serviceId);

const showLetterNumberDialog = () => {
    dialogStore.$state.isLetterNumberDialog = true;
}

const showStatusDialog = () => {
    dialogStore.$state.isStatusDialog = true;
}
</script>
<template>
    <div class="container q-pa-md">
        <div class="row q-mb-md">
            <div class="text-center col-md-3 col-xs-6 col-sm-6">
                <q-btn class="q-mx-md" @click="(dialogStore.$state.isSendViaDialog = true)">
                    Kirim Via
                </q-btn>
            </div>
            <div class="text-center col-md-3 col-xs-6 col-sm-6">
                <q-btn target="_blank" :href="document.downloadURL" icon="download">
                    Download
                </q-btn>
            </div>
            <div class="text-center q-mt-sm col-md-3 col-xs-6 col-sm-6">
                <q-btn @click="showLetterNumberDialog">
                    Cantumkan Nomor Surat
                </q-btn>
            </div>
            <div class="text-center q-mt-sm col-md-3 col-xs-6 col-sm-6">
                <q-btn @click="showStatusDialog">
                    Ubah Status
                </q-btn>
            </div>
        </div>
    </div>
    <div class="row text-center">
        <div class="full-width">
            <iframe class="iframe-placeholder text-center" :width="$q.screen.lt.md ? 300 : 600" height="800"
                :src="`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(document.downloadURL)}`"
                frameborder='0'></iframe>
        </div>
    </div>
    <div class="q-mt-md row text-center">
        <div class="col-12">
            <div class="text-h6 text-center">Info Dokumen</div>
        </div>
        <template v-for="documentData, index in document.data">
            <div class="col-12">
                {{ index }} : {{ documentData }}
            </div>
        </template>
    </div>
    <LetterNumberDialog :letterURL="letter.data.downloadURL" :downloadURL="document.downloadURL"
        :documentData="document.data" :serviceName="service.name" />
    <StatusDialog :documentId="route.params.id" :status="document.status" />
    <SendViaDialog :documentData="document.data" />

</template>

<style scoped>
.iframe-placeholder {
    background: url('../../../assets/Rolling-1s-100px.svg') 0px 0px no-repeat;
}
</style>