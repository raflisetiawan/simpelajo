<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllContact } from "@/services/officers/contact";
import timeSince from "@/utils/timeSince";
const contacts: any = ref(null);

onMounted(async () => {
    contacts.value = await getAllContact();
})
</script>

<template>
    <div class="container q-pa-md">
        <div class="row">
            <template v-for="contact in contacts" :key="contact.id">
                <div class="col-md-4 col-sm-12 col-xs-12">
                    <q-card bordered class="q-ma-sm">
                        <q-card-section>
                            <div class="text-h6">
                                <div class="paragraph text-inline">dari</div> {{ contact.data.name }}
                            </div>
                        </q-card-section>

                        <q-separator />

                        <q-card-section>
                            {{ contact.data.message }}
                        </q-card-section>
                        <q-card-section>
                            {{ timeSince(contact.data.createdAt) }} ago
                        </q-card-section>
                    </q-card>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.paragraph {
    font-size: 12px;
    display: inline;
}
</style>