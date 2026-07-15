<script setup>

const props = defineProps({
    once: {
        type: Boolean,
        default: false
    }
})

const target = ref(null);
const isVisible = useElementVisibility(target);
const hasBeenVisible = ref(false);

const shouldShow = computed(() => {
    if (props.once){
        return hasBeenVisible.value;
    }
    return isVisible.value;
})

watch(isVisible, () => {
    if (isVisible.value) {
        hasBeenVisible.value = true;
    }
})

</script>

<template>

    <div ref="target" class="min-h-[40px] md:min-h-[80px]">
        <transition name="page" mode="in">
            <slot v-if="shouldShow" />
        </transition>
    </div>

</template>