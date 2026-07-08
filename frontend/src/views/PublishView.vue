<template>
  <main class="mx-auto max-w-7xl px-4 py-8">
    <div class="mb-6">
      <h1 class="font-serif text-3xl font-bold text-ink">发布本地生活信息</h1>
      <p class="mt-2 text-sm text-muted">填写后进入待审核状态，审核通过后展示在九江信息网。</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
      <form class="grid gap-5 rounded-xl border border-line bg-surface p-6 shadow-soft md:p-8" @submit.prevent="submitted = true">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="form-field">信息分类
            <select v-model="form.category">
              <option v-for="item in categories" :key="item.slug" :value="item.slug">{{ item.name }}</option>
            </select>
          </label>
          <label class="form-field">所在地区
            <select v-model="form.region">
              <option v-for="item in regions" :key="item">{{ item }}</option>
            </select>
          </label>
        </div>

        <label class="form-field">信息
          <input v-model="form.title" placeholder="例如：浔阳区两室一厅整租，拎包入住" required />
        </label>

        <label class="form-field">详细内容
          <textarea v-model="form.content" rows="9" placeholder="请描述位置、价格、要求、联系方式说明等" required></textarea>
        </label>

        <div class="grid gap-4 md:grid-cols-3">
          <label class="form-field">联系人
            <input v-model="form.contact" required />
          </label>
          <label class="form-field">联系电话
            <input v-model="form.phone" required />
          </label>
          <label class="form-field">预留密码
            <input v-model="form.password" type="password" />
          </label>
        </div>

        <div class="flex flex-col gap-3 rounded-lg bg-paper p-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <span>提交后进入待审核状态，后台审核通过后展示。</span>
          <BaseButton type="submit">提交信息</BaseButton>
        </div>

        <p v-if="submitted" class="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">已提交到待审核队列。</p>
      </form>

      <aside class="rounded-xl border border-line bg-surface p-6 shadow-soft lg:self-start">
        <h2 class="font-serif text-2xl font-semibold text-ink">发布须知</h2>
        <div class="mt-5 space-y-4 text-sm leading-7 text-muted">
          <p>请填写真实、清晰的信息，便于本地用户快速判断和联系。</p>
          <p>请勿发布违法、虚假、重复或含诱导预付费用的信息。</p>
          <p>平台仅提供信息展示，线下交易请自行核验身份、资质和合同。</p>
        </div>
      </aside>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { categories, regions } from "../data/mockClean";
import BaseButton from "../components/ui/BaseButton.vue";

const submitted = ref(false);
const form = reactive({
  category: categories[0].slug,
  region: regions[0],
  title: "",
  content: "",
  contact: "",
  phone: "",
  password: ""
});
</script>
