<template>
  <main class="mx-auto max-w-7xl px-4 py-8">
    <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="font-serif text-3xl font-bold text-ink">后台管理</h1>
        <p class="mt-2 text-sm text-muted">管理信息审核、发布、分类、区域和公告。</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button v-for="tab in tabs" :key="tab.value" :class="['rounded-md px-3 py-2 text-sm font-medium transition', activeTab === tab.value ? 'bg-ink text-white dark:bg-brand' : 'border border-line bg-surface text-muted hover:text-ink']" @click="activeTab = tab.value">
          {{ tab.label }}
        </button>
        <div class="ml-auto flex items-center gap-2 border-l border-line pl-3">
          <span class="text-sm text-muted">{{ user?.username }}</span>
          <button class="admin-btn" @click="handleLogout">退出登录</button>
        </div>
      </div>
    </div>

    <section v-if="activeTab === 'posts'" class="space-y-4">
      <div class="grid gap-4 md:grid-cols-4">
        <div v-for="card in stats" :key="card.label" class="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <p class="text-sm text-muted">{{ card.label }}</p>
          <p class="mt-2 text-2xl font-semibold text-ink">{{ card.value }}</p>
        </div>
      </div>

      <SimpleTable :headers="['信息', '分类', '状态', '置顶', '操作']" columns="grid-cols-[1fr_100px_90px_90px_180px]">
        <div v-for="post in managedPosts" :key="post.id" class="grid grid-cols-[1fr_100px_90px_90px_180px] items-center border-b border-line/70 px-5 py-4 text-sm last:border-b-0">
          <div class="min-w-0">
            <p class="truncate font-medium text-ink">{{ post.title }}</p>
            <p class="mt-1 truncate text-xs text-muted">{{ post.region }} · {{ post.date }} · {{ post.summary }}</p>
          </div>
          <span class="text-muted">{{ categoryShort(post.category) }}</span>
          <span :class="['inline-flex w-fit items-center rounded-full px-2 py-1 text-xs font-medium', auditClass(post.auditStatus)]">{{ post.auditStatus }}</span>
          <span class="text-muted">{{ post.pinned ? '是' : '否' }}</span>
          <div class="flex gap-2">
            <button class="admin-btn" @click="post.auditStatus = '已通过'">通过</button>
            <button class="admin-btn" @click="post.pinned = !post.pinned">{{ post.pinned ? '取消' : '置顶' }}</button>
            <button class="admin-btn danger" @click="removePost(post.id)">删除</button>
          </div>
        </div>
        <EmptyState v-if="!managedPosts.length" text="暂无信息" />
      </SimpleTable>
    </section>

    <section v-else-if="activeTab === 'publish'" class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <form class="grid gap-4 rounded-xl border border-line bg-surface p-6 shadow-soft" @submit.prevent="createPost">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="form-field">信息分类
            <select v-model="postForm.category">
              <option v-for="item in managedCategories" :key="item.slug" :value="item.slug">{{ item.name }}</option>
            </select>
          </label>
          <label class="form-field">所在区域
            <select v-model="postForm.region">
              <option v-for="item in managedRegions" :key="item.name" :value="item.name">{{ item.name }}</option>
            </select>
          </label>
        </div>
        <label class="form-field">信息
          <input v-model="postForm.title" required placeholder="例如：浔阳区两室一厅整租" />
        </label>
        <label class="form-field">摘要
          <input v-model="postForm.summary" required placeholder="一句话说明核心信息" />
        </label>
        <label class="form-field">详细内容
          <textarea v-model="postForm.content" rows="8" required placeholder="填写详细说明"></textarea>
        </label>
        <div class="grid gap-4 md:grid-cols-3">
          <label class="form-field">联系人<input v-model="postForm.contact" required /></label>
          <label class="form-field">电话<input v-model="postForm.phone" required /></label>
          <label class="form-field">标签<input v-model="postForm.status" placeholder="出租/招聘/出售" /></label>
        </div>
        <BaseButton type="submit" class="w-fit">发布信息</BaseButton>
      </form>
      <aside class="rounded-xl border border-line bg-surface p-6 text-sm leading-7 text-muted shadow-soft lg:self-start">
        <h2 class="font-serif text-2xl font-semibold text-ink">发布说明</h2>
        <p class="mt-4">后台发布的信息默认直接通过审核，并展示在前台信息流里。</p>
        <p class="mt-3">后续接入 MySQL 后，这里会调用 `POST /api/posts` 创建真实记录。</p>
      </aside>
    </section>

    <section v-else-if="activeTab === 'categories'" class="grid gap-6 lg:grid-cols-[420px_1fr]">
      <form class="grid gap-4 rounded-xl border border-line bg-surface p-6 shadow-soft" @submit.prevent="saveCategory">
        <h2 class="font-serif text-2xl font-semibold">{{ editingCategory ? '修改分类' : '新增分类' }}</h2>
        <label class="form-field">分类名称<input v-model="categoryForm.name" required /></label>
        <label class="form-field">英文标识<input v-model="categoryForm.slug" required /></label>
        <label class="form-field">说明<input v-model="categoryForm.description" /></label>
        <div class="flex gap-2">
          <BaseButton type="submit">保存分类</BaseButton>
          <BaseButton v-if="editingCategory" variant="secondary" type="button" @click="resetCategoryForm">取消</BaseButton>
        </div>
      </form>
      <SimpleTable :headers="['分类名称', '标识', '说明', '操作']">
        <div v-for="item in managedCategories" :key="item.slug" class="grid grid-cols-[140px_120px_1fr_130px] items-center border-b border-line/70 px-5 py-4 text-sm last:border-b-0">
          <span class="font-medium">{{ item.name }}</span><span class="text-muted">{{ item.slug }}</span><span class="truncate text-muted">{{ item.description }}</span>
          <div class="flex gap-2"><button class="admin-btn" @click="editCategory(item)">修改</button><button class="admin-btn danger" @click="deleteCategory(item.slug)">删除</button></div>
        </div>
      </SimpleTable>
    </section>

    <section v-else-if="activeTab === 'regions'" class="grid gap-6 lg:grid-cols-[420px_1fr]">
      <form class="grid gap-4 rounded-xl border border-line bg-surface p-6 shadow-soft" @submit.prevent="saveRegion">
        <h2 class="font-serif text-2xl font-semibold">{{ editingRegion ? '修改区域' : '新增区域' }}</h2>
        <label class="form-field">区域名称<input v-model="regionForm.name" required /></label>
        <div class="flex gap-2">
          <BaseButton type="submit">保存区域</BaseButton>
          <BaseButton v-if="editingRegion" variant="secondary" type="button" @click="resetRegionForm">取消</BaseButton>
        </div>
      </form>
      <SimpleTable :headers="['区域名称', '操作']" columns="grid-cols-[1fr_130px]">
        <div v-for="item in managedRegions" :key="item.name" class="grid grid-cols-[1fr_130px] items-center border-b border-line/70 px-5 py-4 text-sm last:border-b-0">
          <span class="font-medium">{{ item.name }}</span>
          <div class="flex gap-2"><button class="admin-btn" @click="editRegion(item)">修改</button><button class="admin-btn danger" @click="deleteRegion(item.name)">删除</button></div>
        </div>
      </SimpleTable>
    </section>

    <section v-else class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      <form class="grid gap-4 rounded-xl border border-line bg-surface p-6 shadow-soft" @submit.prevent="saveArticle">
        <h2 class="font-serif text-2xl font-semibold">{{ editingArticle ? '修改公告' : '发布公告' }}</h2>
        <label class="form-field">公告信息<input v-model="articleForm.title" required /></label>
        <label class="form-field">公告内容<textarea v-model="articleForm.content" rows="8" required></textarea></label>
        <label class="flex items-center gap-2 text-sm text-muted"><input v-model="articleForm.published" type="checkbox" /> 立即发布</label>
        <div class="flex gap-2">
          <BaseButton type="submit">保存公告</BaseButton>
          <BaseButton v-if="editingArticle" variant="secondary" type="button" @click="resetArticleForm">取消</BaseButton>
        </div>
      </form>
      <div class="rounded-xl border border-line bg-surface shadow-soft">
        <div v-for="item in articles" :key="item.id" class="border-b border-line/70 p-5 text-sm last:border-b-0">
          <div class="flex items-start justify-between gap-4">
            <div><p class="font-medium text-ink">{{ item.title }}</p><p class="mt-2 line-clamp-2 text-muted">{{ item.content }}</p></div>
            <span :class="['inline-flex items-center rounded-full px-2 py-1 text-xs', item.published ? toneClass('emerald') : toneClass('slate')]">{{ item.published ? '已发布' : '草稿' }}</span>
          </div>
          <div class="mt-3 flex gap-2"><button class="admin-btn" @click="editArticle(item)">修改</button><button class="admin-btn danger" @click="deleteArticle(item.id)">删除</button></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { categories, posts, regions } from "../data/mock";
import SimpleTable from "../components/SimpleTable.vue";
import { toneClass, auditClass } from "../data/badges";
import BaseButton from "../components/ui/BaseButton.vue";
import EmptyState from "../components/ui/EmptyState.vue";
import { useAuth } from "../composables/useAuth.js";

const router = useRouter();
const { user, logout } = useAuth();

async function handleLogout() {
  await logout();
  router.push("/login");
}

const tabs = [
  { label: "信息管理", value: "posts" },
  { label: "发布信息", value: "publish" },
  { label: "分类管理", value: "categories" },
  { label: "区域管理", value: "regions" },
  { label: "公告管理", value: "articles" }
];

const activeTab = ref("posts");
const managedPosts = ref(posts.map((post, index) => ({ ...post, auditStatus: index % 5 === 0 ? "待审核" : "已通过" })));
const managedCategories = ref(categories.map((item) => ({ ...item })));
const managedRegions = ref(regions.map((name) => ({ name })));
const articles = ref([
  { id: 1, title: "九江市未来 72 小时天气与出行提示", content: "近期降雨增多，出行注意道路积水和交通变化。", published: true },
  { id: 2, title: "关于部分公交线路临时调整的通知", content: "受道路施工影响，部分公交线路临时绕行。", published: true }
]);

const stats = computed(() => [
  { label: "全部信息", value: managedPosts.value.length },
  { label: "待审核", value: managedPosts.value.filter((post) => post.auditStatus === "待审核").length },
  { label: "已置顶", value: managedPosts.value.filter((post) => post.pinned).length },
  { label: "公告", value: articles.value.length }
]);

const postForm = reactive({ category: managedCategories.value[0]?.slug || "", region: managedRegions.value[0]?.name || "", title: "", summary: "", content: "", contact: "", phone: "", status: "" });
const categoryForm = reactive({ slug: "", name: "", description: "" });
const regionForm = reactive({ name: "" });
const articleForm = reactive({ title: "", content: "", published: true });
const editingCategory = ref(null);
const editingRegion = ref(null);
const editingArticle = ref(null);

function categoryShort(slug) { return managedCategories.value.find((item) => item.slug === slug)?.short || managedCategories.value.find((item) => item.slug === slug)?.name || "信息"; }
function removePost(id) { managedPosts.value = managedPosts.value.filter((post) => post.id !== id); }
function createPost() {
  managedPosts.value.unshift({ id: Date.now(), ...postForm, expiresIn: 30, date: "今天", pinned: false, views: 0, auditStatus: "已通过" });
  Object.assign(postForm, { title: "", summary: "", content: "", contact: "", phone: "", status: "" });
  activeTab.value = "posts";
}
function saveCategory() {
  const payload = { ...categoryForm, short: categoryForm.name.slice(0, 2), tone: "slate" };
  if (editingCategory.value) managedCategories.value = managedCategories.value.map((item) => item.slug === editingCategory.value ? payload : item);
  else managedCategories.value.push(payload);
  resetCategoryForm();
}
function editCategory(item) { editingCategory.value = item.slug; Object.assign(categoryForm, item); }
function deleteCategory(slug) { managedCategories.value = managedCategories.value.filter((item) => item.slug !== slug); }
function resetCategoryForm() { editingCategory.value = null; Object.assign(categoryForm, { slug: "", name: "", description: "" }); }
function saveRegion() {
  if (editingRegion.value) managedRegions.value = managedRegions.value.map((item) => item.name === editingRegion.value ? { name: regionForm.name } : item);
  else managedRegions.value.push({ name: regionForm.name });
  resetRegionForm();
}
function editRegion(item) { editingRegion.value = item.name; regionForm.name = item.name; }
function deleteRegion(name) { managedRegions.value = managedRegions.value.filter((item) => item.name !== name); }
function resetRegionForm() { editingRegion.value = null; regionForm.name = ""; }
function saveArticle() {
  const payload = { id: editingArticle.value || Date.now(), ...articleForm };
  if (editingArticle.value) articles.value = articles.value.map((item) => item.id === editingArticle.value ? payload : item);
  else articles.value.unshift(payload);
  resetArticleForm();
}
function editArticle(item) { editingArticle.value = item.id; Object.assign(articleForm, item); }
function deleteArticle(id) { articles.value = articles.value.filter((item) => item.id !== id); }
function resetArticleForm() { editingArticle.value = null; Object.assign(articleForm, { title: "", content: "", published: true }); }
</script>
