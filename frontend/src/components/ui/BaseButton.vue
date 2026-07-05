<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to || undefined"
    :type="to ? undefined : type"
    :class="['inline-flex items-center justify-center gap-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-50', sizeClass, variantClass]"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  variant: { type: String, default: "primary" }, // primary | secondary | danger | ghost
  size: { type: String, default: "md" }, // sm | md
  to: { type: [String, Object], default: null },
  type: { type: String, default: "button" }
});

const sizeClass = computed(
  () =>
    ({
      sm: "rounded-md px-3 py-2 text-sm",
      md: "rounded-lg px-5 py-3 text-sm"
    })[props.size] || "rounded-lg px-5 py-3 text-sm"
);

const variantClass = computed(
  () =>
    ({
      primary: "bg-ink text-white hover:bg-brand dark:bg-brand dark:hover:opacity-90",
      secondary: "border border-line text-ink hover:bg-ink/5",
      danger: "border border-line text-red-600 hover:bg-red-500/10 dark:text-red-400",
      ghost: "text-muted hover:bg-ink/5 hover:text-ink"
    })[props.variant] || ""
);
</script>
