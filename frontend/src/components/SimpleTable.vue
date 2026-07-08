<template>
  <div :class="wrapperClass">
    <div :class="['grid border-b border-line bg-paper px-5 py-3 text-xs font-medium text-muted', columns]">
      <span v-for="header in headers" :key="header">{{ header }}</span>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  headers: { type: Array, required: true },
  columns: { type: String, default: "grid-cols-[140px_120px_1fr_130px]" },
  sideBorders: { type: Boolean, default: true }
});

const wrapperClass = computed(() => [
  "overflow-hidden rounded-xl bg-surface shadow-soft",
  props.sideBorders ? "border border-line" : "border-y border-line"
]);
</script>
