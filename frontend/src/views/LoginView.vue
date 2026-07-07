<template>
  <div class="flex min-h-screen items-center justify-center bg-paper px-4">
    <div class="w-full max-w-sm">
      <div class="mb-8 text-center">
        <RouterLink to="/" class="inline-flex items-center gap-2 font-serif text-xl font-bold text-ink">
          <span class="grid h-8 w-8 place-items-center rounded-lg bg-ink text-sm text-white dark:bg-brand">梅</span>
          <span>梅河口生活网</span>
        </RouterLink>
      </div>

      <form class="flex flex-col gap-4 rounded-xl border border-line bg-surface p-6 shadow-soft" @submit.prevent="handleLogin">
        <h1 class="font-serif text-xl font-semibold text-ink">管理员登录</h1>

        <p v-if="error" class="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {{ error }}
        </p>

        <label class="form-field">用户名
          <input v-model="form.username" type="text" required autocomplete="username" />
        </label>
        <label class="form-field">密码
          <input v-model="form.password" type="password" required autocomplete="current-password" />
        </label>

        <BaseButton type="submit" :disabled="loading" class="w-full justify-center">
          {{ loading ? "登录中…" : "登录" }}
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuth } from "../composables/useAuth.js";
import BaseButton from "../components/ui/BaseButton.vue";

const router = useRouter();
const { user, checked } = useAuth();

const form = reactive({ username: "", password: "" });
const loading = ref(false);
const error = ref("");

async function handleLogin() {
  loading.value = true;
  error.value = "";
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (!res.ok) {
      const data = await res.json();
      error.value = data.error || "登录失败";
      return;
    }
    const data = await res.json();
    user.value = data;
    checked.value = true;
    router.push("/admin");
  } catch {
    error.value = "网络错误，请稍后重试";
  } finally {
    loading.value = false;
  }
}
</script>
