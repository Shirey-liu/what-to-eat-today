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
]

export function getThemeById(id: string): Theme | undefined {
  return themes.find((t) => t.id === id)
}
