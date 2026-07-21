<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import PageHeader from '@/components/PageHeader.vue'
import HistoryCard from '@/components/HistoryCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { Trash2 } from 'lucide-vue-next'

const store = useAppStore()

const hasHistory = computed(() => store.history.length > 0)

function handleToggleFavorite(recipeId: string) {
  store.toggleFavorite(recipeId)
}

function handleDelete(id: string) {
  store.removeHistoryItem(id)
}

function handleClearAll() {
  if (confirm('确定清空所有历史记录吗？')) {
    store.clearHistory()
  }
}
</script>

<template>
  <div class="min-h-screen bg-paper">
    <div class="chalkboard-bg pb-8 pt-2">
      <PageHeader show-back :show-history="false" title="收藏与历史" />

      <div class="px-6 pb-6 pt-2">
        <div class="mx-auto max-w-md text-center">
          <p class="text-sm text-paper/80">记录你翻过的每一道好菜</p>
        </div>
      </div>
    </div>

    <main class="mx-auto max-w-md -mt-6 px-4 pb-24">
      <section class="paper-card rounded-3xl p-5">
        <div
          v-if="hasHistory"
          class="mb-4 flex items-center justify-between"
        >
          <h2 class="text-lg font-bold text-chalkboard">历史记录</h2>
          <button
            class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-tomato transition hover:bg-red-50"
            @click="handleClearAll"
          >
            <Trash2 class="h-3.5 w-3.5" />
            清空
          </button>
        </div>

        <div v-if="hasHistory" class="space-y-3">
          <HistoryCard
            v-for="item in store.history"
            :key="item.id"
            :item="item"
            @toggle-favorite="handleToggleFavorite"
            @delete="handleDelete"
          />
        </div>

        <EmptyState
          v-else
          title="还没有记录"
          description="去生成一道菜谱，它就会出现在这里"
        />
      </section>
    </main>
  </div>
</template>
