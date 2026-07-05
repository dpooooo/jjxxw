<template>
  <main class="mx-auto max-w-7xl px-4 py-8">
    <SimpleTable :headers="['分类', '信息', '地区', '有效期', '发布时间']" columns="grid-cols-[120px_1fr_120px_100px_100px]">
      <RouterLink
        v-for="post in filteredPosts"
        :key="post.id"
        :to="`/post/${post.id}`"
        class="grid grid-cols-[120px_1fr_120px_100px_100px] items-center border-b border-line/70 px-5 py-4 text-sm last:border-b-0 hover:bg-paper/70"
      >
        <span class="min-w-0">
          <span :class="['inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', categoryToneClass(post.category)]">
            {{ categoryName(post.category) }}
          </span>
        </span>
        <span class="min-w-0 truncate font-medium text-ink">{{ post.title }}</span>
        <span class="text-muted">{{ post.region }}</span>
        <span class="text-muted">{{ post.expiresIn }}天</span>
        <span class="text-muted">{{ post.date }}</span>
      </RouterLink>

      <EmptyState v-if="!filteredPosts.length" text="没有找到匹配的信息" />
    </SimpleTable>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { categories, posts } from "../data/mock";
import { categoryToneClass } from "../data/badges";
import SimpleTable from "../components/SimpleTable.vue";
import EmptyState from "../components/ui/EmptyState.vue";

const route = useRoute();
const keyword = computed(() => String(route.query.q || "").trim());

const filteredPosts = computed(() => {
  const word = keyword.value;
  return posts.filter((post) => {
    return !word || post.title.includes(word) || post.summary.includes(word) || post.region.includes(word);
  });
});

function categoryName(slug) {
  return categories.find((item) => item.slug === slug)?.short || "信息";
}
</script>
