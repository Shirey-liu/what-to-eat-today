<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import PageHeader from '@/components/PageHeader.vue'
import ThemeCard from '@/components/ThemeCard.vue'
import { themes } from '@/data/themes'
import type { Theme } from '@/types'

const store = useAppStore()
const router = useRouter()

function handleSelect(theme: Theme) {
  store.setTheme(theme)
  store.generateRecipe()
  if (store.currentRecipe) {
    store.addToHistory(store.currentRecipe, theme.name)
  }
  router.push('/result')
}
</script>

<template>
  <div class="min-h-screen bg-paper">
    <div class="chalkboard-bg pb-8 pt-2">
      <PageHeader show-back :show-history="false" title="今天想怎么吃？" />

      <div class="px-6 pb-6 pt-2">
        <div class="mx-auto max-w-md text-center">
          <p class="text-sm text-paper/80">选一种心情，我们为你翻开今天的菜单</p>
        </div>
      </div>
    </div>

    <main class="mx-auto max-w-md -mt-6 px-4 pb-24">
      <section class="paper-card rounded-3xl p-5">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ThemeCard
            v-for="(theme, index) in themes"
            :key="theme.id"
            :theme="theme"
            :index="index"
            @select="handleSelect"
          />
        </div>
      </section>

      <section class="mt-6 text-center">
        <p class="text-xs text-chalkboard/50">
          已选 {{ store.selectedVegetables.length }} 种蔬菜
        </p>
      </section>
    </main>
  </div>
</template>
