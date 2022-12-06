<script setup lang="ts">
import { reactive, ref } from "vue";
import isEmail from "validator/es/lib/isEmail";
import signin from "@/services/auth/signin";
import { useRouter } from "vue-router";
import { redirectToRoleFeature } from "@/services/user/checkRole";

const router = useRouter();
const user = reactive({
  email: "",
  password: "",
});
const loading = ref(false);

const authError = reactive({
  isError: false,
  userNotFound: {
    message: "User tidak terdaftar",
    isError: false,
  },
  wrongPassword: {
    isError: false,
    message: "password salah",
  },
});

const onSubmit = async () => {
  loading.value = true;
  const response: any = await signin(user.email, user.password);
  if (response.errorStatus) {
    authError.isError = true;
    if (response.errorCode === "auth/wrong-password") {
      loading.value = false;
      authError.wrongPassword.isError = true;
    } else if (response.errorCode === "auth/user-not-found") {
      loading.value = false;
      authError.userNotFound.isError = true;
    }
    loading.value = false;
  }
  const roleResponse = await redirectToRoleFeature(response.uid);
  if (roleResponse === "admin") router.push({ name: "Admin" });
  else if (roleResponse === "officer") router.push({ name: "Officer" });
  else router.push({ name: "Home" });
  loading.value = false;
};
</script>

<template>
  <div class="container mx-auto q-pa-md">
    <q-form @submit.prevent="onSubmit">
      <div class="row justify-center">
        <div class="col-md-6">
          <q-card>
            <q-card-section class="bg-primary">
              <div class="text-h6 text-center text-white">Masuk</div>
            </q-card-section>
            <div class="q-pa-md">
              <q-input v-model="user.email" @keyup="authError.userNotFound.isError = false" label="Email"
                class="q-px-md" :rules="[
                  (val) => !!val || 'Tidak boleh kosong',
                  () => isEmail(user.email) || 'Email tidak valid',
                ]" type="email" bottom-slots :error="authError.userNotFound.isError">
                <template v-slot:error>
                  {{ authError.userNotFound.message }}
                </template>
              </q-input>
              <q-input v-model="user.password" type="password" @keyup="authError.wrongPassword.isError = false"
                label="Password" class="q-px-md" :error="authError.wrongPassword.isError"
                :rules="[(val) => !!val || 'Tidak boleh kosong']">
                <template v-slot:error>
                  {{ authError.wrongPassword.message }}
                </template>
              </q-input>
              <q-btn color="primary" class="q-mt-md q-ml-md" type="submit" :loading="loading">Masuk</q-btn>
              <q-btn flat color="blue" class="q-mt-md q-ml-lg" to="signup">belum punya akun? daftar</q-btn>
            </div>
          </q-card>
        </div>
      </div>
    </q-form>
  </div>
</template>
