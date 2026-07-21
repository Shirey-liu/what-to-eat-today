export interface Vegetable {
  id: string
  name: string
  emoji?: string
}

export interface Theme {
  id: string
  name: string
  emoji: string
  description: string
  color: string
  bgColor: string
}

export interface Ingredient {
  name: string
  amount: string
  isRequired: boolean
}

export interface Recipe {
  id: string
  name: string
  themeIds: string[]
  time: string
  difficulty: 'easy' | 'medium' | 'hard'
  ingredients: Ingredient[]
  steps: string[]
  tags?: string[]
}

export interface HistoryItem {
  id: string
  recipeId: string
  recipeName: string
  themeName: string
  createdAt: number
  isFavorite: boolean
}
