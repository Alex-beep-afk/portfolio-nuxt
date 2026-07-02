<template>
    <!-- Teleport déplace ce code directement dans la balise <body> -->
    <Teleport to="body">
        <!-- Le fond noir semi-transparent -->
        <div class="fixed inset-0 bg-black/80 z-[100] flex justify-center items-center p-4 " @click="$emit('close')">

            <!-- La boite de la modale -->
            <div class="bg-gray-900 border border-slate-400/30 rounded-2xl max-w-2xl max-h-[80vh] w-full relative overflow-y-auto"
                @click.stop>
                <!-- Image de couverture du projet -->
                <div class="w-full">

                    <img :src="`${$config.public.apiBaseUrl}${project.coverImage?.contentUrl}`" :alt="project.title"
                        class="object-cover">
                </div>
                <!-- Description du projet -->
                <div class="p-8">
                    <div>
                        <h2 class="text-3xl text-white font-bold mb-4">{{ project.title }}</h2>
                        <p class="text-blue-300">{{ project.description }}</p>
                    </div>

                    <div class=" border border-slate-400/30 mb-10 mt-10"></div>

                    <!-- Difficultés rencontrées -->
                    <h3>Difficultés rencontrées</h3>
                    <p class="text-blue-300">
                        {{ project.difficulties }}

                    </p>
                    <!-- Galerie du projet -->
                    <div class="">
                        <div class="flex justify-between mb-8 mt-8 items-center">
                            <h3 class="text-white font-semibold text-xl">Galerie</h3>
                            <div class="flex justify-between gap-4">
                                <button @click="slidePrev" :disabled="translateXgallery === 0" class="text-black text-sm bg-white rounded-sm w-8 h-8 flex justify-center items-center 
                                    hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out 
                                    disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                        viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"
                                            d="m18.64 19l-5.763-5.763a1.737 1.737 0 0 1 0-2.474L18.64 5m-7 14l-5.763-5.763a1.74 1.74 0 0 1 0-2.474L11.64 5" />
                                    </svg>

                                </button>

                                <button @click="slideNext" :disabled="translateXgallery <= maxTranslateX" class="text-black text-sm bg-white rounded-sm w-8 h-8 flex justify-center items-center hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out
                                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                        viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"
                                            d="m5.36 19l5.763-5.763a1.74 1.74 0 0 0 0-2.474L5.36 5m7 14l5.763-5.763a1.74 1.74 0 0 0 0-2.474L12.36 5" />
                                    </svg>

                                </button>
                            </div>

                        </div>
                        <div class="overflow-hidden p-10 -m10 w-full">

                            <div class="flex gap-4 transition-transform duration-500 ease-in-out" :style="{transform: `translateX(${translateXgallery}px)`}">
                                <div class="min-w-[240px] h-[160px] cursor-pointer  hover:scale-[1.3] relative z-10 hover:z-50 transition-all duration-500"
                                    v-for="image in project.gallery" :key="image.id">
                                    <img :src="`${$config.public.apiBaseUrl}${image.contentUrl}`" :alt="image.title"
                                        class="w-full h-full object-cover grayscale hover:grayscale-0 rounded-lg shadow-lg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </Teleport>

</template>

<script setup>
// La modale a besoin de savoir quel projet afficher
const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})

// La modale a besoin de pouvoir dire "ferme-moi"
defineEmits(['close'])

const translateXgallery = ref(0);

const slideWidth = 256;

const slideNext = () => {
    translateXgallery.value -= slideWidth;
}

const slidePrev = () => {
    translateXgallery.value += slideWidth;
}

const maxTranslateX = computed(() => {
    return -(props.project.gallery?.length - 1) * slideWidth;
});

</script>
