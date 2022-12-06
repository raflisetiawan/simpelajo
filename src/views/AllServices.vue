<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from "vue";
import { useQuasar } from "quasar";
import { getAllServices, deleteService } from "@/services/admin/service";
import CreateServiceDialog from "@/components/dialogs/CreateServiceDialog.vue";
import { useFormBuilderStore } from "@/stores/formBuilder"
import { useLetterStore } from "@/stores/letter"
import UploadLetterDialog from "@/components/letters/UploadLetterDialog.vue";

const quasar = useQuasar();
const letterStore = useLetterStore();
const formBuilderStore = useFormBuilderStore();
const tableHeads = ["Nama", "actions"];
const services: any = ref([]);
const keyword = ref("")
const loading = ref(false);

const getServiceData: any = onMounted(async () => {
  loading.value = true;
  const response = await getAllServices();
  services.value = response;
  loading.value = false;
});

const ToFormBuilderButton = defineAsyncComponent(() =>
  import('@/components/ToFormBuilderButton.vue')
)
const showCreateDialog = () => {
  formBuilderStore.$state.createServiceDialog = !formBuilderStore.$state.createServiceDialog
};

const deleteServiceData = (id: string, name: string) => {
  quasar.dialog({
    title: 'Konfirmasi',
    message: `Anda yakin ingin menghapus "${name}"" ?`,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await deleteService(id)
    await getServiceData()
  })
}

const editService = (id: string, name: string) => {
  formBuilderStore.$state.createServiceDialog = !formBuilderStore.$state.createServiceDialog
  formBuilderStore.$state.editServiceDialog.isDialog = !formBuilderStore.$state.editServiceDialog.isDialog
  formBuilderStore.$state.editServiceDialog.oldName = name;
  formBuilderStore.$state.editServiceDialog.id = id;
};

</script>

<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <template v-for="tableHead in tableHeads">
            <th class="text-left" :colspan="tableHead === 'Nama' ? 3 : 1">
              {{ tableHead }}
            </th>
          </template>
          <th class="text-right">
            <q-input dark dense standout v-model="keyword" input-class="text-right" class="q-ml-md">
              <template v-slot:append>
                <q-icon color="primary" v-if="keyword === ''" name="search" />
                <q-icon v-else color="primary" name="clear" class="cursor-pointer" @click="keyword = ''" />
              </template>
            </q-input>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.id">
          <td class="text-left" colspan="3">{{ service.data.name }}</td>
          <td class="text-left" colspan="3">
            <q-btn icon="delete" dense color="red" flat @click="deleteServiceData(service.id, service.data.name)">
              <q-tooltip>
                Hapus
              </q-tooltip>
            </q-btn>
            <q-btn icon="edit" @click="editService(service.id, service.data.name)" dense flat color="green"
              class="q-ml-sm">
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-btn>
            <q-btn icon="info" dense flat color="accent"
              :to="{ name: 'LetterPreview', params: { slug: service.data.slug } }" class="q-ml-sm">
              <q-tooltip>
                Detail
              </q-tooltip>
            </q-btn>
            <Suspense>
              <!-- component with nested async dependencies -->
              <ToFormBuilderButton :serviceId="service.id" :service="service" :key="letterStore.$state.componentKey" />
              <template #fallback>
                <q-spinner color="primary" size="3em" />
              </template>
            </Suspense>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" @click="showCreateDialog()">
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </div>
  <div class="full-width text-center">
    <q-spinner color="primary" size="3em" v-if="loading" class="text-center" />
  </div>
  <div class="text-h5 text-center" v-if="services.length === 0">Data masih kosong</div>
  <CreateServiceDialog :services="services" @updateServiceData="getServiceData" />
  <UploadLetterDialog @updateServiceData="getServiceData" />
</template>
