<script setup lang="ts">
import { ArrowLeft, History } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

interface Props {
  showBack?: boolean
  showHistory?: boolean
  title?: string
}

withDefaults(defineProps<Props>(), {
  showBack: false,
  showHistory: true,
  title: '',
})

const router = useRouter()
</script>

<template>
  <header class="flex items-center justify-between px-4 py-4">
    <button
      v-if="showBack"
      class="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-chalkboard shadow-sm transition hover:shadow-md btn-press"
      @click="router.back()"
    >
      <ArrowLeft class="h-5 w-5" />
    </button>
    <div v-else class="h-10 w-10" />

    <h1 v-if="title" class="text-lg font-bold text-paper">
      {{ title }}
    </h1>
    <div v-else class="h-10 w-10" />

    <button
      v-if="showHistory"
      class="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-chalkboard shadow-sm transition hover:shadow-md btn-press"
      @click="router.push('/history')"
    >
      <History class="h-5 w-5" />
    </button>
    <div v-else class="h-10 w-10" />
  </header>
</template>
