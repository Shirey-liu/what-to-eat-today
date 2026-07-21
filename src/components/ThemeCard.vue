<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { Theme } from '@/types'

interface Props {
  theme: Theme
  index: number
}

defineProps<Props>()

defineEmits<{
  (e: 'select', theme: Theme): void
}>()
</script>

<template>
  <button
    class="group relative flex flex-col items-start gap-2 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg btn-press animate-fade-up"
    :class="theme.bgColor"
    :style="{ animationFillMode: 'backwards', animationDelay: `${index * 80}ms` }"
    @click="$emit('select', theme)"
  >
    <div class="flex w-full items-center justify-between">
      <span class="text-3xl">{{ theme.emoji }}</span>
      <ArrowRight
        class="h-5 w-5 -translate-x-1 text-chalkboard/40 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
      />
    </div>
    <div>
      <h3 class="text-lg font-bold" :class="theme.color">{{ theme.name }}</h3>
      <p class="mt-0.5 text-sm text-chalkboard/70">{{ theme.description }}</p>
    </div>
  </button>
</template>
