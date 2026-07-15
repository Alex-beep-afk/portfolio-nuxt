<template>

    <div :class="colorText" class="font-terminal text-center flex items-baseline gap-1 min-h-[30px]"
        :style="width < 768 ? { fontSize: `${size * 0.8}px` } : { fontSize: `${size}px` }"> {{ displayText }}
        <span :class="colorCursor" class="h-px animate-pulse" :style="{ width: `${size / 2}px` }"></span>
    </div>


</template>

<script setup>

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    speed: {
        type: Number,
        required: false,
        default: 150
    },
    size: {
        type: Number,
        required: false,
        default: 16
    },
    colorText: {
        type: String,
        required: false,
        default: "text-blue-500"
    },
    colorCursor: {
        type: String,
        required: false,
        default: "bg-blue-500"
    }
})

const { width, height } = useWindowSize()

const fullText = props.text

const displayText = ref("")

const typingSpeed = props.speed

const isFinished = ref(false)


const typeText = () => {
    let currentIndex = 0

    const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
            displayText.value += fullText.charAt(currentIndex)
            currentIndex++
        } else {
            clearInterval(interval)
            isFinished.value = true
        }
    }, typingSpeed)
}

onMounted(() => {
    typeText()
})
</script>