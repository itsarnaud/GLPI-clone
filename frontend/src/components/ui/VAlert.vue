<script setup>
  const props = defineProps({
    title: { type: [String], required: true },
    description: { type: [String, null], default: '' },
    icon: { type: [String, null], default: '' },
    color: { type: [String], required: true },
  })

  const VARIANT = {
    'danger': 'bg-danger-light border-2 border-danger text-danger p-3 rounded-xl break-all',
    'info': 'bg-info-light border-2 border-info text-info p-3 rounded-xl break-all',
    'success': 'bg-success-light border-2 border-success text-success p-3 rounded-xl break-all',
    'warning': 'bg-warning-light border-2 border-warning text-warning p-3 rounded-xl break-all',
  }
</script>

<template>
  <div :class="VARIANT[props.color]">
    <div class="flex items-center gap-2">
      <UIcon v-if="icon" :name="icon" class="size-5" />
      <h3 class="font-semibold">{{ title }}</h3>
    </div>
    <p v-if="description" class="text-sm mt-2">{{ description }}</p>
    <slot />
  </div>
</template>