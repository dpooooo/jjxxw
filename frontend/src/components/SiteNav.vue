<template>
  <header class="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur-md">
    <div class="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_minmax(220px,320px)_auto] items-center gap-4 px-4 py-3 max-lg:grid-cols-[auto_1fr_auto] max-md:grid-cols-[1fr_auto]">
      <RouterLink to="/" class="flex items-center gap-2 font-serif text-xl font-bold tracking-normal text-ink max-md:min-w-0">
        <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink text-sm text-white dark:bg-brand">九</span>
        <span class="whitespace-nowrap">九江信息网</span>
      </RouterLink>

      <div class="flex min-w-0 items-center gap-1 overflow-x-auto max-lg:order-4 max-lg:col-span-3 max-lg:w-full max-md:col-span-2">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-link whitespace-nowrap">
          {{ item.label }}
        </RouterLink>
      </div>

      <label class="flex min-w-0 items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 shadow-[0_1px_0_rgba(31,41,55,0.02)] max-lg:ml-auto max-lg:w-full max-lg:max-w-sm max-md:order-3 max-md:col-span-2 max-md:max-w-none">
        <Search class="h-4 w-4 shrink-0 text-muted" />
        <input v-model="keyword" class="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="搜索房产、招聘、二手、车辆..." @keydown.enter.prevent="submitSearch" />
      </label>

      <div class="flex items-center gap-2 max-md:order-2 max-md:justify-self-end">
        <ThemeToggle />
        <BaseButton to="/publish" size="sm">
          <Plus class="h-4 w-4" />
          发布信息
        </BaseButton>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Plus, Search } from "lucide-vue-next";
import ThemeToggle from "./ui/ThemeToggle.vue";
import BaseButton from "./ui/BaseButton.vue";

const router = useRouter();
const keyword = ref("");

const navItems = [
  { label: "首页", to: "/" },
  { label: "房产", to: "/category/housing" },
  { label: "招聘", to: "/category/jobs" },
  { label: "二手", to: "/category/market" },
  { label: "车辆", to: "/category/cars" },
  { label: "出兑", to: "/category/business" },
  { label: "服务", to: "/category/services" },
  { label: "公告", to: "/category/news" }
];

function submitSearch() {
  const query = keyword.value.trim() ? { q: keyword.value.trim() } : {};
  router.push({ path: "/", query });
}
</script>
