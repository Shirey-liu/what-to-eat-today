<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Search } from 'lucide-vue-next'
import { commonVegetables } from '@/data/vegetables'
import type { Vegetable } from '@/types'

interface Props {
  selectedIds: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'add', vegetable: Vegetable): void
}>()

const inputValue = ref('')
const isFocused = ref(false)

const filteredVegetables = computed(() => {
  const query = inputValue.value.trim()
  if (!query) {
    return commonVegetables.filter((v) => !props.selectedIds.includes(v.id)).slice(0, 12)
  }
  return commonVegetables.filter(
    (v) =>
      !props.selectedIds.includes(v.id) &&
      (v.name.includes(query) || v.id.includes(query.toLowerCase())),
  )
})

const canAddCustom = computed(() => {
  const query = inputValue.value.trim()
  if (!query) return false
  const exists = commonVegetables.some((v) => v.name === query || v.id === query)
  return !exists
})

function handleAdd(vegetable: Vegetable) {
  emit('add', vegetable)
  inputValue.value = ''
}

function addCustom() {
  const query = inputValue.value.trim()
  if (!query) return
  const customVegetable: Vegetable = {
    id: `custom-${Date.now()}`,
    name: query,
    emoji: '🥬',
  }
  emit('add', customVegetable)
  inputValue.value = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    if (filteredVegetables.value.length > 0) {
      handleAdd(filteredVegetables.value[0])
    } else if (canAddCustom.value) {
      addCustom()
    }
  }
}
</script>

<template>
  <div class="space-y-3">
    <div
      class="flex items-center gap-2 rounded-2xl border-2 border-chalkboard/10 bg-paper px-4 py-3 transition focus-within:border-tomato focus-within:shadow-md"
    >
      <Search class="h-5 w-5 flex-shrink-0 text-chalkboard/40" />
      <input
        v-model="inputValue"
        type="text"
        placeholder="输入蔬菜名称，按回车添加..."
        class="w-full bg-transparent text-base outline-none placeholder:text-chalkboard/40"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown="onKeydown"
      />
      <button
        v-if="canAddCustom"
        class="flex h-8 items-center gap-1 rounded-full bg-tomato px-3 text-sm font-medium text-white btn-press"
        @click="addCustom"
      >
        <Plus class="h-4 w-4" />
        添加
      </button>
    </div>

    <div
      class="flex flex-wrap gap-2 transition-all"
      :class="isFocused || inputValue ? 'opacity-100' : 'opacity-100'"
    >
      <button
        v-for="veg in filteredVegetables"
        :key="veg.id"
        class="inline-flex items-center gap-1 rounded-full border border-chalkboard/10 bg-paper px-3 py-1.5 text-sm transition hover:border-tomato hover:bg-tomato/5 btn-press"
        @click="handleAdd(veg)"
      >
        <span v-if="veg.emoji">{{ veg.emoji }}</span>
        <span>{{ veg.name }}</span>
        <Plus class="ml-0.5 h-3.5 w-3.5 text-chalkboard/40" />
      </button>
    </div>
  </div>
</template>
