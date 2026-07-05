import { ref } from "vue";

const STORAGE_KEY = "theme";

// 模块级单例：所有组件共享同一份主题状态。
// 初始值取自 <html> 上的 dark 类（由 index.html 的防闪烁脚本在首屏前设置）。
const isDark = ref(
  typeof document !== "undefined" && document.documentElement.classList.contains("dark")
);

function apply(dark) {
  isDark.value = dark;
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch (e) {
    /* localStorage 不可用时静默降级 */
  }
}

export function useTheme() {
  function toggle() {
    apply(!isDark.value);
  }
  function set(dark) {
    apply(dark);
  }
  return { isDark, toggle, set };
}
