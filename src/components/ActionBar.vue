<script setup lang="ts">
import { RefreshCw, Heart, Copy, CheckCheck } from 'lucide-vue-next'
import { ref } from 'vue'

interface Props {
  isFavorite: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'regenerate'): void
  (e: 'toggle-favorite'): void
  (e: 'copy'): void
}>()

const copied = ref(false)

function handleCopy() {
  emit('copy')
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1500)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <button
      class="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-paper py-3 text-sm font-medium text-chalkboard shadow-sm transition hover:shadow-md btn-press"
      @click="$emit('regenerate')"
    >
      <RefreshCw class="h-5 w-5 text-sky" />
      重新生成
    </button>

    <button
      class="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-paper py-3 text-sm font-medium shadow-sm transition hover:shadow-md btn-press"
      :class="isFavorite ? 'text-tomato' : 'text-chalkboard'"
      @click="$emit('toggle-favorite')"
    >
      <Heart class="h-5 w-5 transition-all" :class="isFavorite ? 'fill-current' : ''" />
      {{ isFavorite ? '已收藏' : '收藏' }}
    </button>

    <button
      class="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-paper py-3 text-sm font-medium text-chalkboard shadow-sm transition hover:shadow-md btn-press"
      @click="handleCopy"
    >
      <CheckCheck v-if="copied" class="h-5 w-5 text-avocado" />
      <Copy v-else class="h-5 w-5 text-mustard-dark" />
      {{ copied ? '已复制' : '复制做法' }}
    </button>
  </div>
</template>
