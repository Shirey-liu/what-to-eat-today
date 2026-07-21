import type { Recipe, Vegetable } from '@/types'
import { recipes } from '@/data/recipes'

export interface MatchResult {
  recipe: Recipe
  score: number
}

const fallbackRecipe: Recipe = {
  id: 'veggie-mix',
  name: '蔬菜大杂烩',
  themeIds: ['clear-fridge', 'quick-dinner', 'lazy-slim'],
  time: '15 分钟',
  difficulty: 'easy',
  ingredients: [
    { name: '你拥有的蔬菜', amount: '全部', isRequired: true },
    { name: '大蒜', amount: '3 瓣', isRequired: false },
    { name: '生抽', amount: '1 勺', isRequired: false },
    { name: '盐', amount: '适量', isRequired: false },
    { name: '橄榄油', amount: '1 勺', isRequired: false },
  ],
  steps: [
    '所有蔬菜洗净，切成大小相近的块或片。',
    '热锅凉油，先爆香蒜末。',
    '按耐熟程度依次放入蔬菜，大火翻炒。',
    '加入生抽和盐调味，翻炒均匀即可出锅。',
  ],
  tags: ['零浪费', '随心炒'],
}

function normalize(name: string): string {
  return name.trim().toLowerCase()
}

export function matchRecipes(
  selectedVegetables: Vegetable[],
  themeId: string,
  excludeId?: string,
): MatchResult {
  const selectedNames = new Set(selectedVegetables.map((v) => normalize(v.name)))

  const candidates = recipes
    .filter((recipe) => recipe.themeIds.includes(themeId) && recipe.id !== excludeId)
    .map((recipe) => {
      const requiredIngredients = recipe.ingredients.filter((i) => i.isRequired)
      if (requiredIngredients.length === 0) {
        return { recipe, score: 0 }
      }

      const matchedCount = requiredIngredients.filter((ingredient) =>
        selectedNames.has(normalize(ingredient.name)),
      ).length

      const score = matchedCount / requiredIngredients.length
      return { recipe, score }
    })
    .filter((item) => item.score >= 0.3)
    .sort((a, b) => b.score - a.score)

  if (candidates.length === 0) {
    if (excludeId === fallbackRecipe.id) {
      return { recipe: fallbackRecipe, score: 1 }
    }
    return { recipe: fallbackRecipe, score: 1 }
  }

  const topScore = candidates[0].score
  const pool = candidates.filter((item) => item.score >= topScore - 0.1)
  const randomIndex = Math.floor(Math.random() * pool.length)
  return pool[randomIndex]
}
