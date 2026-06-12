<template>
    <div class="flex items-baseline gap-1">
        <span class="text-blue-500 font-semibold">{{ displayText }}</span>
        <span class="w-2.5 h-px bg-blue-500 animate-pulse" ></span>
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
    }
})

const fullText = props.text

const displayText = ref("")

const typingSpeed = props.speed

const isFinished = ref(false)


const typeText = () =>{
    let currentIndex = 0

    const interval = setInterval(()=>{
        if(currentIndex < fullText.length){
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