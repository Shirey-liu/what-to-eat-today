import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Vegetable, Theme, Recipe, HistoryItem } from '@/types'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { matchRecipes } from '@/utils/recipeMatcher'

const STORAGE_KEYS = {
  selected: 'veggie-blind-box:selected',
  history: 'veggie-blind-box:history',
  favorites: 'veggie-blind-box:favorites',
}

export const useAppStore = defineStore('app', () => {
  const selectedVegetables = useLocalStorage<Vegetable[]>(STORAGE_KEYS.selected, [])
  const history = useLocalStorage<HistoryItem[]>(STORAGE_KEYS.history, [])
  const favorites = useLocalStorage<string[]>(STORAGE_KEYS.favorites, [])

  const currentTheme = ref<Theme | null>(null)
  const currentRecipe = ref<Recipe | null>(null)

  const hasSelectedVegetables = computed(() => selectedVegetables.value.length > 0)

  function addVegetable(vegetable: Vegetable) {
    const exists = selectedVegetables.value.some((v) => v.id === vegetable.id)
    if (!exists) {
      selectedVegetables.value.push(vegetable)
    }
  }

  function removeVegetable(id: string) {
    selectedVegetables.value = selectedVegetables.value.filter((v) => v.id !== id)
  }

  function clearVegetables() {
    selectedVegetables.value = []
  }

  function setTheme(theme: Theme) {
    currentTheme.value = theme
  }

  function generateRecipe(excludeId?: string) {
    if (!currentTheme.value) return null
    const result = matchRecipes(selectedVegetables.value, currentTheme.value.id, excludeId)
    currentRecipe.value = result.recipe
    return result.recipe
  }

  function addToHistory(recipe: Recipe, themeName: string) {
    const exists = history.value.some(
      (item) => item.recipeId === recipe.id && item.themeName === themeName,
    )
    if (exists) return

    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      recipeId: recipe.id,
      recipeName: recipe.name,
      themeName,
      createdAt: Date.now(),
      isFavorite: favorites.value.includes(recipe.id),
    }
    history.value.unshift(newItem)
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }
  }

  function toggleFavorite(recipeId: string) {
    const index = favorites.value.indexOf(recipeId)
    if (index === -1) {
      favorites.value.push(recipeId)
    } else {
      favorites.value.splice(index, 1)
    }

    history.value = history.value.map((item) =>
      item.recipeId === recipeId ? { ...item, isFavorite: !item.isFavorite } : item,
    )
  }

  function removeHistoryItem(id: string) {
    history.value = history.value.filter((item) => item.id !== id)
  }

  function clearHistory() {
    history.value = []
  }

  function isFavorite(recipeId: string) {
    return favorites.value.includes(recipeId)
  }

  return {
    selectedVegetables,
    history,
    favorites,
    currentTheme,
    currentRecipe,
    hasSelectedVegetables,
    addVegetable,
    removeVegetable,
    clearVegetables,
    setTheme,
    generateRecipe,
    addToHistory,
    toggleFavorite,
    removeHistoryItem,
    clearHistory,
    isFavorite,
  }
})
