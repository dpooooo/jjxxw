<template>
  <div class="min-h-screen bg-paper text-ink">
    <SiteNav v-if="!route.meta.hideLayout" />
    <RouterView />
    <SiteFooter v-if="!route.meta.hideLayout" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import SiteNav from "./components/SiteNav.vue";
import SiteFooter from "./components/SiteFooter.vue";

const route = useRoute();
</script>
