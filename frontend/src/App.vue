<template>
  <div class="min-h-screen bg-paper text-ink">
    <SiteNav />
    <RouterView />
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteNav from "./components/SiteNav.vue";
import SiteFooter from "./components/SiteFooter.vue";
</script>
