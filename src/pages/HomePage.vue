<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ChefHat, Sparkles } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'
import PageHeader from '@/components/PageHeader.vue'
import VeggieInput from '@/components/VeggieInput.vue'
import VeggieTag from '@/components/VeggieTag.vue'
import type { Vegetable } from '@/types'

const store = useAppStore()
const router = useRouter()

function handleAdd(vegetable: Vegetable) {
  store.addVegetable(vegetable)
}

function handleRemove(id: string) {
  store.removeVegetable(id)
}

function goToTheme() {
  if (!store.hasSelectedVegetables) return
  router.push('/theme')
}
</script>

<template>
  <div class="min-h-screen bg-paper">
    <div class="chalkboard-bg pb-8 pt-2">
      <PageHeader :show-back="false" :show-history="true" />

      <div class="px-6 pb-6 pt-2">
        <div class="mx-auto max-w-md text-center">
          <div class="mb-3 inline-flex items-center justify-center rounded-2xl bg-paper/10 p-3 text-4xl animate-float">
            🥕
          </div>
          <h1 class="text-3xl font-bold tracking-wide text-paper">今天吃什么</h1>
          <p class="mt-2 text-sm text-paper/80">打开冰箱，帮你挑一道今天想吃的</p>
        </div>
      </div>
    </div>

    <main class="mx-auto max-w-md -mt-6 px-4 pb-28">
      <section class="paper-card rounded-3xl p-5 animate-fade-up">
        <div class="mb-4 flex items-center gap-2">
          <Sparkles class="h-5 w-5 text-tomato" />
          <h2 class="text-lg font-bold text-chalkboard">你冰箱里有什么？</h2>
        </div>
        <VeggieInput
          :selected-ids="store.selectedVegetables.map((v) => v.id)"
          @add="handleAdd"
        />
      </section>

      <section v-if="store.hasSelectedVegetables" class="mt-4 animate-fade-up">
        <div class="mb-3 flex items-center justify-between px-1">
          <h3 class="text-sm font-bold text-chalkboard/70">已选蔬菜</h3>
          <button
            class="text-xs text-tomato transition hover:underline"
            @click="store.clearVegetables"
          >
            清空
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <VeggieTag
            v-for="veg in store.selectedVegetables"
            :key="veg.id"
            :vegetable="veg"
            @remove="handleRemove"
          />
        </div>
      </section>

      <section v-else class="mt-8 animate-fade-up">
        <div class="rounded-2xl border-2 border-dashed border-chalkboard/10 p-6 text-center">
          <div class="mb-2 text-3xl">🧺</div>
          <p class="text-sm text-chalkboard/60">先添加几样蔬菜，我们就能帮你搭配菜谱啦</p>
        </div>
      </section>
    </main>

    <div class="fixed bottom-0 left-0 right-0 border-t border-chalkboard/5 bg-paper/95 p-4 backdrop-blur-sm">
      <div class="mx-auto max-w-md">
        <button
          class="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-lg font-bold text-white shadow-lg transition-all btn-press"
          :class="store.hasSelectedVegetables ? 'bg-tomato hover:shadow-xl' : 'cursor-not-allowed bg-chalkboard/30'"
          :disabled="!store.hasSelectedVegetables"
          @click="goToTheme"
        >
          <ChefHat class="h-5 w-5" />
          开始匹配
        </button>
      </div>
    </div>
  </div>
</template>
