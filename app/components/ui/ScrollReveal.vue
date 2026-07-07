<script setup>
const target = ref(null)
const isVisible = useElementVisibility(target)
</script>

<template>

    <div ref="target" class="min-h-[40px] md:min-h-[100px]">
        <slot v-if="isVisible" />
    </div>
    
</template>