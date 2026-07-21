import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key)
  const initialValue: T = stored ? (JSON.parse(stored) as T) : defaultValue
  const value = ref<T>(initialValue) as Ref<T>

  watch(
    value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  return value
}
