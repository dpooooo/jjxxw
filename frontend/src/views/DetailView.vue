<template>
  <main class="mx-auto max-w-7xl px-4 py-8">
    <article v-if="post" class="rounded-xl border border-line bg-surface p-6 shadow-soft md:p-8">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div class="min-w-0">
          <p class="text-sm text-muted">{{ category?.name }} / 信息详情</p>
          <h1 class="mt-4 font-serif text-3xl font-bold leading-tight text-ink md:text-4xl">{{ post.title }}</h1>
          <p class="mt-4 text-sm text-muted">
            信息编号：P-{{ post.id }} · 发布时间：{{ post.date }} · 有效期：{{ post.expiresIn }}天 · 浏览量：{{ post.views }}人次
          </p>
        </div>
        <StatusBadge :status="post.status" size="lg" class="shrink-0" />
      </div>

      <div class="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <div class="min-w-0">
          <h2 class="font-serif text-2xl font-semibold text-ink">详细内容</h2>
          <p class="mt-5 max-w-4xl whitespace-pre-line text-base leading-9 text-ink">{{ post.content }}</p>

          <div class="mt-10 max-w-4xl rounded-xl bg-paper p-5 text-sm leading-8 text-muted md:p-6">
            <p class="font-medium text-ink">使用信息须知</p>
            <p class="mt-2">该信息由用户自行发布，平台仅提供信息展示。请拒绝预付费用，优先见面交易，核验证照资质，签订必要合同。</p>
          </div>
        </div>

        <aside class="rounded-xl border border-line bg-paper p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 class="font-serif text-2xl font-semibold text-ink">联系方式</h2>
          <dl class="mt-6 space-y-4 text-sm">
            <div class="flex justify-between gap-6">
              <dt class="text-muted">地区</dt>
              <dd class="font-medium text-ink">{{ post.region }}</dd>
            </div>
            <div class="flex justify-between gap-6">
              <dt class="text-muted">联系人</dt>
              <dd class="font-medium text-ink">{{ post.contact }}</dd>
            </div>
            <div class="flex justify-between gap-6">
              <dt class="text-muted">电话</dt>
              <dd class="font-medium text-ink">{{ post.phone }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { getCategory, getPost } from "../data/mock";
import StatusBadge from "../components/ui/StatusBadge.vue";

const route = useRoute();
const post = computed(() => getPost(route.params.id));
const category = computed(() => post.value ? getCategory(post.value.category) : null);
</script>
