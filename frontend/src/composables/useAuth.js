import { ref } from "vue";

// 模块级单例 — 所有组件共享同一认证状态
// null = 未检查, false = 未登录, { username, role } = 已登录
const user = ref(null);
const checked = ref(false);

export function useAuth() {
  async function check() {
    if (checked.value) return;
    try {
      const res = await fetch("/api/auth/me");
      user.value = res.ok ? await res.json() : false;
    } catch {
      user.value = false;
    } finally {
      checked.value = true;
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    user.value = false;
  }

  return { user, checked, check, logout };
}
