<script setup lang="ts">
import { Heart, Trash2, Clock } from 'lucide-vue-next'
import type { HistoryItem } from '@/types'

interface Props {
  item: HistoryItem
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle-favorite', id: string): void
  (e: 'delete', id: string): void
}>()

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}
</script>

<template>
  <div class="paper-card flex items-center gap-4 rounded-2xl p-4 animate-fade-up">
    <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-tomato/10 text-2xl">
      🍽️
    </div>
    <div class="min-w-0 flex-1">
      <h4 class="truncate font-bold text-chalkboard">{{ item.recipeName }}</h4>
      <div class="mt-0.5 flex items-center gap-2 text-xs text-chalkboard/60">
        <span class="inline-flex items-center gap-1">
          <Clock class="h-3 w-3" />
          {{ formatDate(item.createdAt) }}
        </span>
        <span class="rounded-full bg-chalkboard/5 px-2 py-0.5">{{ item.themeName }}</span>
      </div>
    </div>
    <div class="flex items-center gap-1">
      <button
        class="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-chalkboard/5"
        :class="item.isFavorite ? 'text-tomato' : 'text-chalkboard/40'"
        @click="$emit('toggle-favorite', item.recipeId)"
      >
        <Heart class="h-4 w-4" :class="item.isFavorite ? 'fill-current' : ''" />
      </button>
      <button
        class="flex h-9 w-9 items-center justify-center rounded-full text-chalkboard/40 transition hover:bg-red-50 hover:text-tomato"
        @click="$emit('delete', item.id)"
      >
        <Trash2 class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
