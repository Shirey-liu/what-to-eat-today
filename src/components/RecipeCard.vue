<script setup lang="ts">
import { Check, ChefHat, Clock, Flame } from 'lucide-vue-next'
import type { Recipe, Vegetable } from '@/types'

interface Props {
  recipe: Recipe
  selectedVegetables: Vegetable[]
}

const props = defineProps<Props>()

const selectedNames = new Set(props.selectedVegetables.map((v) => v.name))

const difficultyMap: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '进阶',
}

function hasIngredient(name: string): boolean {
  return selectedNames.has(name)
}
</script>

<template>
  <div class="paper-card rounded-3xl p-6">
    <div class="mb-4 flex items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold leading-tight text-chalkboard">
          {{ recipe.name }}
        </h2>
        <div class="mt-2 flex flex-wrap items-center gap-2">
          <span
            v-for="tag in recipe.tags"
            :key="tag"
            class="rounded-full bg-chalkboard/5 px-2.5 py-0.5 text-xs text-chalkboard/70"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <div class="rounded-2xl bg-tomato/10 p-3 text-tomato">
        <ChefHat class="h-7 w-7" />
      </div>
    </div>

    <div class="mb-6 flex flex-wrap items-center gap-3 text-sm text-chalkboard/70">
      <span class="inline-flex items-center gap-1 rounded-full bg-mustard/20 px-3 py-1">
        <Clock class="h-4 w-4" />
        {{ recipe.time }}
      </span>
      <span class="inline-flex items-center gap-1 rounded-full bg-avocado/20 px-3 py-1">
        <Flame class="h-4 w-4" />
        {{ difficultyMap[recipe.difficulty] }}
      </span>
    </div>

    <div class="rounded-2xl bg-chalkboard/5 p-4">
      <h3 class="mb-3 text-sm font-bold text-chalkboard/80">用料清单</h3>
      <ul class="space-y-2">
        <li
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
          class="flex items-start gap-2 text-sm"
        >
          <span
            class="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
            :class="hasIngredient(ingredient.name) ? 'bg-avocado text-white' : 'bg-chalkboard/10 text-chalkboard/30'"
          >
            <Check class="h-3 w-3" />
          </span>
          <span :class="hasIngredient(ingredient.name) ? 'font-medium text-chalkboard' : 'text-chalkboard/70'">
            {{ ingredient.name }}
          </span>
          <span class="ml-auto text-chalkboard/50">{{ ingredient.amount }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
