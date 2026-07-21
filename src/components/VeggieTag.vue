<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { Vegetable } from '@/types'
import { getVegetableColor } from '@/data/vegetables'

interface Props {
  vegetable: Vegetable
  removable?: boolean
}

withDefaults(defineProps<Props>(), {
  removable: true,
})

defineEmits<{
  (e: 'remove', id: string): void
}>()
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium animate-pop-in"
    :class="getVegetableColor(vegetable.id)"
  >
    <span v-if="vegetable.emoji" class="text-base">{{ vegetable.emoji }}</span>
    <span>{{ vegetable.name }}</span>
    <button
      v-if="removable"
      class="ml-0.5 rounded-full p-0.5 opacity-70 transition hover:bg-black/10 hover:opacity-100"
      @click="$emit('remove', vegetable.id)"
    >
      <X class="h-3.5 w-3.5" />
    </button>
  </span>
</template>
