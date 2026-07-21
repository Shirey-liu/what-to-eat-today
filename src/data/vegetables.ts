import type { Vegetable } from '@/types'

export const commonVegetables: Vegetable[] = [
  { id: 'tomato', name: '番茄', emoji: '🍅' },
  { id: 'egg', name: '鸡蛋', emoji: '🥚' },
  { id: 'potato', name: '土豆', emoji: '🥔' },
  { id: 'carrot', name: '胡萝卜', emoji: '🥕' },
  { id: 'cucumber', name: '黄瓜', emoji: '🥒' },
  { id: 'eggplant', name: '茄子', emoji: '🍆' },
  { id: 'pepper', name: '青椒', emoji: '🫑' },
  { id: 'corn', name: '玉米', emoji: '🌽' },
  { id: 'broccoli', name: '西兰花', emoji: '🥦' },
  { id: 'mushroom', name: '香菇', emoji: '🍄' },
  { id: 'onion', name: '洋葱', emoji: '🧅' },
  { id: 'garlic', name: '大蒜', emoji: '🧄' },
  { id: 'tofu', name: '豆腐', emoji: '🧊' },
  { id: 'spinach', name: '菠菜', emoji: '🥬' },
  { id: 'cabbage', name: '卷心菜', emoji: '🥬' },
  { id: 'bean', name: '四季豆', emoji: '🫛' },
  { id: 'pumpkin', name: '南瓜', emoji: '🎃' },
  { id: 'zucchini', name: '西葫芦', emoji: '🥒' },
]

export const vegetableColorMap: Record<string, string> = {
  tomato: 'bg-tomato/20 text-tomato border-tomato/30',
  egg: 'bg-mustard/20 text-mustard-dark border-mustard/30',
  potato: 'bg-mustard/20 text-mustard-dark border-mustard/30',
  carrot: 'bg-carrot/20 text-carrot border-carrot/30',
  cucumber: 'bg-avocado/20 text-avocado-dark border-avocado/30',
  eggplant: 'bg-eggplant/20 text-eggplant border-eggplant/30',
  pepper: 'bg-avocado/20 text-avocado-dark border-avocado/30',
  corn: 'bg-mustard/20 text-mustard-dark border-mustard/30',
  broccoli: 'bg-avocado/20 text-avocado-dark border-avocado/30',
  mushroom: 'bg-stone/20 text-stone-dark border-stone/30',
  onion: 'bg-stone/20 text-stone-dark border-stone/30',
  garlic: 'bg-stone/20 text-stone-dark border-stone/30',
  tofu: 'bg-sky/20 text-sky-dark border-sky/30',
  spinach: 'bg-avocado/20 text-avocado-dark border-avocado/30',
  cabbage: 'bg-avocado/20 text-avocado-dark border-avocado/30',
  bean: 'bg-avocado/20 text-avocado-dark border-avocado/30',
  pumpkin: 'bg-carrot/20 text-carrot border-carrot/30',
  zucchini: 'bg-avocado/20 text-avocado-dark border-avocado/30',
}

export function getVegetableColor(id: string): string {
  return vegetableColorMap[id] || 'bg-sky/20 text-sky-dark border-sky/30'
}
