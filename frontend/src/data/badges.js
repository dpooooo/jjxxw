import { categories } from "./mock";

// 徽章配色单一数据源：每个 tone 提供浅色 + 深色两套 class，
// status / 分类 / 审核态都归一到 tone，避免各页面各写一份映射。
export const tones = {
  emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  sky: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-400/15 dark:text-slate-300",
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
};

// status 文案 → tone，覆盖 mock 中实际出现的全部标签。
const statusToneMap = {
  出租: "emerald", 出售: "emerald", 个人车: "emerald",
  急招: "rose", 招聘: "rose", 转让: "rose", 置顶: "rose",
  回收: "amber",
  门市: "violet",
  顺风车: "sky",
  服务: "slate", 维修: "slate", 装修: "slate", 保洁: "slate",
  公告: "blue", 资讯: "blue"
};

// 后台审核状态 → tone。
const auditToneMap = { 已通过: "emerald", 已拒绝: "rose", 待审核: "amber" };

export function toneClass(tone) {
  return tones[tone] || tones.slate;
}

export function statusClass(status) {
  return toneClass(statusToneMap[status]);
}

export function categoryToneClass(slug) {
  const category = categories.find((item) => item.slug === slug);
  return toneClass(category?.tone);
}

export function auditClass(status) {
  return toneClass(auditToneMap[status]);
}
