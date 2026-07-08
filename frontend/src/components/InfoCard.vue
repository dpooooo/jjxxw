<template>
  <section class="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
    <div class="flex items-start justify-between gap-4 px-5 pb-3 pt-5">
      <div class="flex min-w-0 items-center gap-3">
        <div :class="['grid h-10 w-10 shrink-0 place-items-center rounded-lg text-sm font-bold', toneClass(category.tone)]">
          {{ category.short }}
        </div>
        <div class="min-w-0">
          <h2 class="truncate font-serif text-lg font-semibold text-ink">{{ category.name }}</h2>
          <p class="truncate text-sm text-muted">{{ category.description }}</p>
        </div>
      </div>
      <RouterLink :to="`/category/${category.slug}`" class="shrink-0 text-sm font-medium text-accent hover:text-ink">
        查看更多 →
      </RouterLink>
    </div>

    <div class="border-t border-line/80">
      <RouterLink v-for="post in rows" :key="post.id" :to="`/post/${post.id}`" class="grid grid-cols-[1fr_auto] gap-3 border-b border-line/60 px-5 py-3 text-sm transition last:border-b-0 hover:bg-paper/70">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <StatusBadge :status="post.status" size="sm" />
            <span class="truncate font-medium text-ink">{{ post.title }}</span>
          </div>
          <p class="mt-1 truncate text-xs text-muted">{{ post.region }} · {{ post.summary }}</p>
        </div>
        <div class="text-right text-xs text-muted">
          <p>{{ post.date }}</p>
          <p>{{ post.expiresIn }}天有效</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { toneClass } from "../data/badgesClean";
import StatusBadge from "./ui/StatusBadge.vue";

defineProps({
  category: { type: Object, required: true },
  rows: { type: Array, required: true }
});
</script>
