import type { Theme } from '@/types'

export const themes: Theme[] = [
  {
    id: 'lazy-slim',
    name: '懒人减脂',
    emoji: '🥗',
    description: '少油少盐，快手搞定',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
  },
  {
    id: 'quick-dinner',
    name: '快手晚餐',
    emoji: '⚡',
    description: '20 分钟上桌',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
  },
  {
    id: 'weekend-feast',
    name: '周末大餐',
    emoji: '🍲',
    description: '多花点心思犒劳自己',
    color: 'text-rose-700',
    bgColor: 'bg-rose-100',
  },
  {
    id: 'clear-fridge',
    name: '清空冰箱',
    emoji: '🧊',
    description: '把边角料一网打尽',
    color: 'text-sky-700',
    bgColor: 'bg-sky-100',
  },
  {
    id: 'kids-love',
    name: '宝宝爱吃',
    emoji: '🧒',
    description: '清淡好嚼又下饭',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
  },
  {
    id: 'boiled-simple',
    name: '水煮无门槛',
    emoji: '🍲',
    description: '最基础的水煮做法，零厨艺也能做',
    color: 'text-teal-700',
    bgColor: 'bg-teal-100',
  },
  {
    id: 'harvard-diet',
    name: '哈佛减肥法',
    emoji: '🥣',
    description: '经典哈佛蔬菜汤，低卡饱腹',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-100',
  },
  {
    id: 'budget-slim',
    name: '穷鬼减肥法',
    emoji: '💰',
    description: '省钱又营养，减脂不烧钱',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  {
    id: 'one-white',
    name: '一只白减肥法',
    emoji: '🥚',
    description: '高蛋白低碳水，增肌减脂',
    color: 'text-slate-700',
    bgColor: 'bg-slate-100',
  },
  {
    id: 'month-diet',
    name: '窦月减肥法',
    emoji: '📅',
    description: '30天循序渐进，稳定掉秤',
    color: 'text-pink-700',
    bgColor: 'bg-pink-100',
  },
]

export function getThemeById(id: string): Theme | undefined {
  return themes.find((t) => t.id === id)
}
