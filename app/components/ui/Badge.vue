<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'type', 'category'].includes(value)
  }
})

const badgeClasses = computed(() => {
  switch (props.variant) {
    case 'type':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20'

    case 'category':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      
    default:
      return 'bg-white/10 text-slate-300 border-white/20'
  }
})
</script>

<template>
  <span 
    class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border"
    :class="badgeClasses"
  >
    {{ label }}
  </span>
</template>
