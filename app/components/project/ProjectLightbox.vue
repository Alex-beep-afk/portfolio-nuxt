<script setup>
const props=defineProps({
    selectedImage: {
        type: Object,
        required: true
    }
})

defineEmits(['close']);


</script>

<template>
    <Teleport to="body">
        <div class="fixed inset-0 z-[200] bg-black/80 flex justify-center items-center p-4" @click="$emit('close')">
            <img :src="`${$config.public.apiBaseUrl}${selectedImage.contentUrl}`" :alt="selectedImage.title"
                class="max-w-full max-h-full object-contain rounded-2xl shadow-lg shadow-blue-500/80">
        </div>
    </Teleport>

</template>