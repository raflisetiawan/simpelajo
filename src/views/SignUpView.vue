<script setup lang="ts">
import { reactive, ref } from "vue";
import isEmail from "validator/es/lib/isEmail";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import signup from "@/services/auth/signup";
import addUser from "@/services/user/addUser";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  email: "",
  username: "",
  password: "",
  validatePassword: "",
});

const loading = ref(false);

const authError = reactive({
  isEmailAlreadyUsed: false,
});

const onSubmit = async () => {
  loading.value = true;
  const response: any = await signup(user.email, user.password);
  if (response.errorCode === "auth/email-already-in-use") {
    loading.value = false;
    authError.isEmailAlreadyUsed = true;
  } else {
    await addUser(response, user.username, response.uid);
    loading.value = false;
    router.push({ name: "Home" });
  }
};
</script>
<template>
  <div class="container mx-auto q-pa-md">
    <div class="row justify-center">
      <div class="col-md-6">
        <q-form @submit.prevent="onSubmit">
          <q-card>
            <q-card-section class="bg-primary">
              <div class="text-h6 text-center text-white">Daftar</div>
            </q-card-section>
            <div class="q-pa-md">
              <q-input label="Email" bottom-slots v-model="user.email" @keyup="authError.isEmailAlreadyUsed = false"
                class="q-px-md" :rules="[
                  (val) => !!val || 'Tidak boleh kosong',
                  () => isEmail(user.email) || 'Email tidak valid',
                ]" type="email" :error="authError.isEmailAlreadyUsed">
                <template v-slot:error> Email sudah terdaftar </template>
              </q-input>
              <q-input label="username" v-model="user.username" :rules="[(val) => !!val || 'Tidak boleh kosong']"
                class="q-px-md" />
              <q-input label="Password" v-model="user.password" :rules="[
                (val) => !!val || 'Tidak boleh kosong',
                () =>
                  isStrongPassword(user.password, {
                    minSymbols: 0,
                  }) ||
                  'Password harus mengandung angka, 8 karakter, 1 huruf kapital',
              ]" class="q-px-md" type="password" bottom-slot>
                <!-- <template v-slot:error></template> -->
              </q-input>
              <q-input label="Konfirmasi Password" v-model="user.validatePassword" :rules="[
                (val) => !!val || 'Tidak boleh kosong',
                () =>
                  user.password == user.validatePassword ||
                  'Password tidak sama',
              ]" class="q-px-md" type="password" />
              <q-btn color="primary" :loading="loading" type="submit" class="q-mt-md q-ml-md">Daftar</q-btn>
              <q-btn flat color="blue" class="q-mt-md q-ml-lg" :to="{ name: 'signin' }">sudah punya akun? masuk</q-btn>
              <q-btn flat color="blue" class="q-mt-md q-ml-lg" :to="{ name: 'Home' }">beranda</q-btn>
            </div>
          </q-card>
        </q-form>
      </div>
    </div>
  </div>
</template>
