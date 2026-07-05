<template>
  <main class="mx-auto max-w-7xl px-4 py-8">
    <div class="mb-6">
      <h1 class="font-serif text-3xl font-bold text-ink">{{ category?.name || "分类信息" }}</h1>
      <p class="mt-2 text-muted">{{ category?.description }}</p>
    </div>

    <SimpleTable :headers="['信息', '地区', '有效期', '发布时间']" columns="grid-cols-[1fr_110px_90px_80px]">
      <RouterLink
        v-for="post in categoryPosts"
        :key="post.id"
        :to="`/post/${post.id}`"
        class="grid grid-cols-[1fr_110px_90px_80px] items-center border-b border-line/70 px-5 py-4 text-sm last:border-b-0 hover:bg-paper/70"
      >
        <span class="min-w-0 truncate font-medium text-ink">{{ post.title }}</span>
        <span class="text-muted">{{ post.region }}</span>
        <span class="text-muted">{{ post.expiresIn }}天</span>
        <span class="text-muted">{{ post.date }}</span>
      </RouterLink>

      <EmptyState v-if="!categoryPosts.length" text="暂无此分类信息" />
    </SimpleTable>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { getCategory, getPostsByCategory } from "../data/mock";
import SimpleTable from "../components/SimpleTable.vue";
import EmptyState from "../components/ui/EmptyState.vue";

const route = useRoute();
const category = computed(() => getCategory(route.params.slug));
const categoryPosts = computed(() => getPostsByCategory(route.params.slug));
</script>
