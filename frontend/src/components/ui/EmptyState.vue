<template>
  <div class="px-5 py-10 text-center text-sm text-muted">
    {{ text }}
  </div>
</template>

<script setup>
defineProps({
  text: { type: String, default: "暂无数据" }
});
</script>
