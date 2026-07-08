<template>
  <main class="mx-auto max-w-7xl px-4 py-8">
    <div v-if="hotRegions.length" class="mb-6 overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
      <div class="flex items-center justify-between gap-3 border-b border-line bg-paper px-5 py-3 max-sm:flex-col max-sm:items-start">
        <h2 class="text-xs font-medium tracking-[0.16em] text-muted">热门区域</h2>
        <button v-if="selectedRegion" @click="clearRegion" class="region-link">
          清除筛选
        </button>
      </div>

      <div class="region-nav px-4 py-4">
        <button
          v-for="region in hotRegions"
          :key="region.name"
          @click="selectRegion(region.name)"
          :class="['region-link', selectedRegion === region.name && 'region-link-active']"
        >
          {{ region.name }}
          <span class="region-count">{{ region.count }}</span>
        </button>
      </div>
    </div>

    <SimpleTable
      :headers="['分类', '信息', '地区', '有效期', '发布时间']"
      columns="grid-cols-[120px_1fr_120px_100px_100px]"
      :side-borders="false"
    >
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
import { useRoute, useRouter } from "vue-router";
import { categories, posts, getHotRegions } from "../data/mockClean";
import { categoryToneClass } from "../data/badgesClean";
import SimpleTable from "../components/SimpleTable.vue";
import EmptyState from "../components/ui/EmptyState.vue";

const route = useRoute();
const router = useRouter();

const hotRegions = computed(() => getHotRegions(posts));
const selectedRegion = computed(() => String(route.query.region || "").trim() || null);
const keyword = computed(() => String(route.query.q || "").trim());

function selectRegion(name) {
  if (route.query.region === name) return;
  router.replace({ query: { ...route.query, region: name } });
}

function clearRegion() {
  const q = { ...route.query };
  delete q.region;
  router.replace({ query: q });
}

const filteredPosts = computed(() => {
  let result = posts;

  if (keyword.value) {
    result = result.filter((post) => {
      return post.title.includes(keyword.value) || post.summary.includes(keyword.value) || post.region.includes(keyword.value);
    });
  }

  if (selectedRegion.value) {
    result = result.filter((post) => post.region === selectedRegion.value);
  }

  return result;
});

function categoryName(slug) {
  return categories.find((item) => item.slug === slug)?.short || "信息";
}
</script>
