<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: '这里空空如也',
  description: '还没有记录哦',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center animate-fade-up">
    <div class="relative mb-4 h-32 w-32">
      <svg viewBox="0 0 120 120" class="h-full w-full text-chalkboard/15" fill="currentColor">
        <rect x="25" y="35" width="70" height="80" rx="8" />
        <rect x="35" y="25" width="50" height="15" rx="4" />
        <circle cx="45" cy="20" r="4" />
        <circle cx="75" cy="20" r="4" />
        <rect x="40" y="55" width="40" height="6" rx="3" />
        <rect x="40" y="70" width="30" height="6" rx="3" />
        <rect x="40" y="85" width="35" height="6" rx="3" />
      </svg>
      <div class="absolute -right-1 -top-2 animate-float text-3xl">🥬</div>
    </div>
    <h3 class="text-lg font-bold text-chalkboard">{{ title }}</h3>
    <p class="mt-1 text-sm text-chalkboard/60">{{ description }}</p>
  </div>
</template>
