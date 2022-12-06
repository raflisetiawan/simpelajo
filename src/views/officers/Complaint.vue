<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllComplaint } from "@/services/officers/complaint";
import truncateWords from "@/utils/truncateWords";
import timeSince from "@/utils/timeSince"

const complaints: any = ref(null);

onMounted(async () => {
    complaints.value = await getAllComplaint();
})
</script>

<template>
    <div class="container q-pa-md">
        <div class="row">
            <template v-for="complaint in complaints" :key="complaint.id">
                <div class="col-md-4 col-xs-12 col-sm-12">
                    <q-card bordered class="q-ma-sm">
                        <q-card-section>
                            <div class="text-h6">{{ truncateWords(complaint.data.complaint, 5, "...") }}</div>
                            <div class="text-subtitle2" v-if="complaint.data.name">dari {{ complaint.data.name }}</div>
                        </q-card-section>

                        <q-separator dark inset />

                        <q-card-section>
                            {{ complaint.data.suggestion }}
                        </q-card-section>
                        <q-card-section>
                            <div class="float-right">{{ timeSince(complaint.data.createdAt) }} ago</div>
                        </q-card-section>
                        <q-btn flat color="blue" class="q-mb-sm"
                            :to="{ name: 'ComplaintDetail', params: { id: complaint.id } }">Selengkapnya</q-btn>
                    </q-card>
                </div>
            </template>
        </div>
    </div>
</template>