<template>
  <button
    type="button"
    class="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line text-muted transition hover:text-ink"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
    @click="toggle"
  >
    <Moon v-if="!isDark" class="h-4 w-4" />
    <Sun v-else class="h-4 w-4" />
  </button>
</template>

<script setup>
import { Moon, Sun } from "lucide-vue-next";
import { useTheme } from "../../composables/useTheme";

const { isDark, toggle } = useTheme();
</script>
