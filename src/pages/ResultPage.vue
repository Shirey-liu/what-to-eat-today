<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import PageHeader from '@/components/PageHeader.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import StepList from '@/components/StepList.vue'
import ActionBar from '@/components/ActionBar.vue'
import { Loader2 } from 'lucide-vue-next'

const store = useAppStore()
const router = useRouter()
const isGenerating = ref(false)

const recipe = computed(() => store.currentRecipe)
const themeName = computed(() => store.currentTheme?.name || '')
const favorite = computed(() => (recipe.value ? store.isFavorite(recipe.value.id) : false))

function handleRegenerate() {
  if (!recipe.value) return
  isGenerating.value = true
  setTimeout(() => {
    const newRecipe = store.generateRecipe(recipe.value?.id)
    if (newRecipe) {
      store.addToHistory(newRecipe, themeName.value)
    }
    isGenerating.value = false
  }, 600)
}

function handleToggleFavorite() {
  if (!recipe.value) return
  store.toggleFavorite(recipe.value.id)
}

function handleCopy() {
  if (!recipe.value) return
  const lines = [
    `🍽️ ${recipe.value.name}`,
    `主题：${themeName.value} | 时间：${recipe.value.time}`,
    '',
    '用料：',
    ...recipe.value.ingredients.map((i) => `- ${i.name} ${i.amount}`),
    '',
    '做法：',
    ...recipe.value.steps.map((step, index) => `${index + 1}. ${step}`),
  ]
  navigator.clipboard.writeText(lines.join('\n'))
}

watch(
  () => store.currentRecipe,
  (newRecipe) => {
    if (!newRecipe) {
      store.generateRecipe()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="min-h-screen bg-paper">
    <div class="chalkboard-bg pb-8 pt-2">
      <PageHeader show-back :show-history="true" title="翻到的菜单" />

      <div class="px-6 pb-6 pt-2">
        <div class="mx-auto max-w-md text-center">
          <p class="text-sm text-paper/80">根据你选的 {{ store.selectedVegetables.length }} 种蔬菜推荐</p>
        </div>
      </div>
    </div>

    <main class="mx-auto max-w-md -mt-6 px-4 pb-24">
      <div v-if="isGenerating" class="py-20 text-center animate-fade-up">
        <Loader2 class="mx-auto h-10 w-10 animate-spin text-tomato" />
        <p class="mt-4 text-sm text-chalkboard/60">正在翻翻菜单...</p>
      </div>

      <template v-else-if="recipe">
        <RecipeCard
          :recipe="recipe"
          :selected-vegetables="store.selectedVegetables"
          class="animate-fade-up"
        />

        <StepList class="mt-4" :steps="recipe.steps" />

        <ActionBar
          class="mt-4"
          :is-favorite="favorite"
          @regenerate="handleRegenerate"
          @toggle-favorite="handleToggleFavorite"
          @copy="handleCopy"
        />

        <div class="mt-6 text-center">
          <button
            class="text-sm text-chalkboard/50 underline-offset-4 transition hover:text-tomato hover:underline"
            @click="router.push('/')"
          >
            重新选择蔬菜
          </button>
        </div>
      </template>

      <div v-else class="py-20 text-center">
        <p class="text-chalkboard/60">还没有生成菜谱，去选个主题吧</p>
        <button
          class="mt-4 rounded-2xl bg-tomato px-6 py-2.5 text-sm font-bold text-white btn-press"
          @click="router.push('/theme')"
        >
          去选择主题
        </button>
      </div>
    </main>
  </div>
</template>
