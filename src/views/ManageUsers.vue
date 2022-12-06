<script setup lang="ts">
import getUser from "../services/user/getUsers";
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import editUserRole from "@/services/user/editUserRole";

const users: any = ref([]);
const quasar = useQuasar();
const rows = ref([
  {
    name: "Email",
    position: "text-left",
  },
  {
    name: "Username",
    position: "text-center",
  },
  {
    name: "Role",
    position: "text-center",
  },
  {
    name: "Action",
    position: "text-center",
  },
]);

const updateChangedUser = async () => {
  const response = await getUser();
  users.value = response;
};

onMounted(() => {
  updateChangedUser();
});

const updateRole = (userId: string) => {
  quasar
    .dialog({
      title: "Ganti Role",
      message: "Pilih role yang akan di edit",
      options: {
        type: "radio",
        model: "admin",
        // inline: true
        items: [
          { label: "admin", value: "admin" },
          { label: "petugas", value: "officer" },
          { label: "user", value: "user" },
        ],
      },
      cancel: true,
      persistent: true,
    })
    .onOk(async (role) => {
      await editUserRole(userId, role);
      updateChangedUser();
    });
};
</script>

<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <template v-for="row in rows" :key="row.name">
            <th :class="row.position">{{ row.name }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="text-left">{{ user.email }}</td>
          <td class="text-center">{{ user.username }}</td>
          <td class="text-center">
            {{ user.role == "officer" ? "petugas" : user.role }}
          </td>
          <td class="text-center">
            <q-btn icon="drive_file_rename_outline" color="green" dense @click="updateRole(user.id)"></q-btn>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
