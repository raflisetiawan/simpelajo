<script setup lang="ts">
import { ref } from 'vue';

const slide = ref(1);
const autoplay = ref(true);
</script>

<template>
  <section id="hero" style="height: 100vh" class="bg-krem">
    <q-carousel style="height: 100vh" animated v-model="slide" navigation infinite :autoplay="autoplay" arrows swipeable
      transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
      @mouseleave="autoplay = true">
      <q-carousel-slide :name="1" img-src="/src/assets/3.jpg" swipeable>
        <div class="absolute-center custom-caption text-white">
          <div :class="$q.screen.lt.md ? `text-h4 text-shadow` : `text-h2 text-shadow`">Selamat Datang di Website Simpel
            Ajo</div>
          <div class="text-subtitle1 text-shadow">Sistem Pelayanan Online Desa Sukorejo berbasis Website untuk
            Kebutuhan Administrasi, Aduan, dan Aspirasi Masyarakat Dalam Upaya
            Awal Menuju Smart Village</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" img-src="/src/assets/1.jpg" swipeable>
        <div class="absolute-center custom-caption text-white">
          <div :class="$q.screen.lt.md ? `text-h4 text-shadow` : `text-h2 text-shadow`">Selamat Datang di Website Simpel
            Ajo</div>
          <div class="text-subtitle1 text-shadow">Sistem Pelayanan Online Desa Sukorejo berbasis Website untuk
            Kebutuhan Administrasi, Aduan, dan Aspirasi Masyarakat Dalam Upaya
            Awal Menuju Smart Village</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" img-src="/src/assets/2.jpg" swipeable>
        <div class="absolute-center custom-caption text-white">
          <div :class="$q.screen.lt.md ? `text-h4 text-shadow` : `text-h2 text-shadow`">Selamat Datang di Website Simpel
            Ajo</div>
          <div class="text-subtitle1 text-shadow">Sistem Pelayanan Online Desa Sukorejo berbasis Website untuk
            Kebutuhan Administrasi, Aduan, dan Aspirasi Masyarakat Dalam Upaya
            Awal Menuju Smart Village</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </section>
</template>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 8px black;
}
</style>