<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useFormOptionsStore } from "../../stores/formOptions";
const $q = useQuasar();
const routes = useRoute();
const store = useFormOptionsStore();
const selectOption = ref("");
const group = ref("Laki-Laki");
const tanggal = ref("2019/02/01");
const religionOption = ref("");

const letters = ref([]);
</script>
<template>
  <div :class="$q.screen.lt.md ? `container` : `container q-pa-md`">
    <div :class="$q.screen.lt.sm ? `row justify-center` : `row`">
      <div class="col-md-6 q-pa-md col-sm-10 col-xs-10">
        <q-input label="Masukkan Nama" />
      </div>
      <div class="col-md-6 q-pa-md col-sm-10 col-xs-10">
        Jenis Kelamin
        <q-option-group
          v-model="group"
          :options="store.$state.genderOptions"
          color="primary"
          inline
        />
      </div>
      <div class="col-md-6 q-pa-md col-sm-6 col-xs-5">
        <q-input label="Tempat Lahir" />
      </div>
      <div class="col-md-6 q-pa-md col-sm-6 col-xs-5">
        <q-input
          label="Tanggal Lahir"
          v-model="tanggal"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="tanggal">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-md-6 q-pa-md col-sm-6 col-xs-10">
        <q-select
          v-model="religionOption"
          :options="store.$state.religionOptions"
          label="Agama"
        />
      </div>
      <div class="col-md-6 q-pa-md col-sm-6 col-xs-10">
        <q-input label="Kebangsaan" />
      </div>
      <div class="col-md-6 q-pa-md col-sm-10 col-xs-10">
        <q-input label="Pekerjaan" />
      </div>
      <div class="col-md-6 q-pa-md col-sm-8 col-xs-10">
        <q-input label="Alamat" />
      </div>
      <div class="col-md-6 q-pa-md col-sm-8 col-xs-10">
        <q-input label="Maksud" autogrow />
      </div>
      <div class="col-md-6 q-pa-md col-sm-8 col-xs-10">
        <div>
          <q-btn
            class="q-mt-md"
            label="Submit"
            to="layanan/detail"
            type="submit"
            color="primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>
