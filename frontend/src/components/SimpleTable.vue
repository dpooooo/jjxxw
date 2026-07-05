<template>
  <div class="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
    <div :class="['grid border-b border-line bg-paper px-5 py-3 text-xs font-medium text-muted', columns]">
      <span v-for="header in headers" :key="header">{{ header }}</span>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  headers: { type: Array, required: true },
  columns: { type: String, default: "grid-cols-[140px_120px_1fr_130px]" }
});
</script>
