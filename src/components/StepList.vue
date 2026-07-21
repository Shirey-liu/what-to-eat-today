<script setup lang="ts">
interface Props {
  steps: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="paper-card rounded-3xl p-6">
    <h3 class="mb-4 text-lg font-bold text-chalkboard">做法步骤</h3>
    <ol class="space-y-4">
      <li
        v-for="(step, index) in steps"
        :key="index"
        class="flex gap-3 animate-fade-up"
        :style="{ animationFillMode: 'backwards', animationDelay: `${index * 100}ms` }"
      >
        <span class="hand-drawn-circle mt-0.5 flex-shrink-0 text-tomato">
          {{ index + 1 }}
        </span>
        <p class="pt-0.5 text-sm leading-relaxed text-chalkboard/80">{{ step }}</p>
      </li>
    </ol>
  </div>
</template>
