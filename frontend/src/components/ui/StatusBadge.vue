<template>
  <span :class="['inline-flex items-center rounded-full font-medium', sizeClass, statusClass(status)]">
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from "vue";
import { statusClass } from "../../data/badgesClean";

const props = defineProps({
  status: { type: String, required: true },
  size: { type: String, default: "md" } // sm | md | lg
});

const sizeClass = computed(
  () =>
    ({
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-xs",
      lg: "px-4 py-1.5 text-sm"
    })[props.size] || "px-2.5 py-1 text-xs"
);
</script>
