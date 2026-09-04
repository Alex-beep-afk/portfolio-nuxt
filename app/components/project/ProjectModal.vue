<template>
   
    <Teleport to="body">
       
        <div class="fixed inset-0 bg-black/80 z-[100] flex justify-center items-center p-4 " @click="$emit('close')">

            
            <div class="bg-gray-900 border border-slate-400/30 rounded-2xl max-w-2xl max-h-[80vh] w-full relative overflow-y-scroll no-scrollbar"
                @click.stop ref="scrollContainer">
                
                <div class="w-full">

                    <img :src="`${$config.public.apiBaseUrl}${project.coverImage?.contentUrl}`" :alt="project.title"
                        class="object-cover mx-auto">
                </div>
                
                <div class="p-8">
                    <div>
                        <h3 class="text-3xl text-white font-bold mb-4">{{ project.title }}</h3>
                        <p class="text-blue-300">{{ project.description }}</p>
                    </div>

                    <div class=" border border-slate-400/30 mb-10 mt-10"></div>

                    <!-- Difficultés rencontrées -->
                    <h3 class="text-3xl text-white font-bold mb-4">Difficultés rencontrées</h3>
                    <p class="text-blue-300">
                        {{ project.difficulties }}

                    </p>

                    <div class=" border border-slate-400/30 mb-10 mt-10"></div>

                    <!-- Galerie du projet -->

                    <div class="flex justify-between mb-8 items-center">
                        <h3 class="text-white font-semibold text-3xl">Galerie</h3>
                        <div class="flex justify-between gap-4">
                            <button @click="slidePrev" :disabled="translateXgallery === 0"
                                class="text-black text-sm bg-white rounded-sm w-8 h-8 flex justify-center items-center 
                                    hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out 
                                    disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="1.5"
                                        d="m18.64 19l-5.763-5.763a1.737 1.737 0 0 1 0-2.474L18.64 5m-7 14l-5.763-5.763a1.74 1.74 0 0 1 0-2.474L11.64 5" />
                                </svg>

                            </button>

                            <button @click="slideNext" :disabled="translateXgallery <= maxTranslateX"
                                class="text-black text-sm bg-white rounded-sm w-8 h-8 flex justify-center items-center hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out
                                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="1.5"
                                        d="m5.36 19l5.763-5.763a1.74 1.74 0 0 0 0-2.474L5.36 5m7 14l5.763-5.763a1.74 1.74 0 0 0 0-2.474L12.36 5" />
                                </svg>

                            </button>
                        </div>

                    </div>
                    <div class="overflow-hidden p-10 -m10 w-full">

                        <div class="flex gap-4 transition-transform duration-500 ease-in-out"
                            :style="{ transform: `translateX(${translateXgallery}px)` }">
                            <div class="min-w-[240px] h-[160px] cursor-pointer  hover:scale-[1.3]  hover:z-50 rounded-lg hover:ring-2 hover:ring-blue-500 transition-all duration-500 relative z-10 overflow-hidden "
                                v-for="image in project.gallery" :key="image.id">
                                <img :src="`${$config.public.apiBaseUrl}${image.contentUrl}`" :alt="image.title"
                                    class="w-full h-full object-cover grayscale hover:grayscale-0">
                            </div>
                        </div>
                    </div>

                    <div class="border border-slate-400/30 mb-10 mt-10"></div>

                    <div>
                        <h3 class="text-white font-semibold text-3xl mb-10">Technologies utilisées</h3>
                        <div class="flex flex-wrap gap-4">
                            <UiBadgeSecondary v-for="tech in project.techno" :key="tech.id" :label="tech.title" />
                        </div>
                    </div>

                    <div class=" border border-slate-400/30 mb-10 mt-10"></div>

                    <div class="flex justify-between gap-10">
                        <UiButtonPrimary label="Voir le projet en ligne" :to="project.link" class="text-center" />
                        <UiButtonSecondary label="Voir le projet sur GitHub" :to="project.githubLink" class="text-center" />
                    </div>

                </div>

                <div class="sticky bottom-0 z-50 text-blue-500 flex items-center justify-center animate-bounce overflow-hidden "
                    :class="scrollPercentage > 70 || isScrolling ? 'max-h-0 p-0' : 'max-h-24 p-2'">
                    <span
                        class="backdrop-blur-sm p-2 rounded-full shadow-[inset_0_0_20px_rgba(59,130,246,0.5)] transition-opacity duration-500 ease-in-out"
                        :class="scrollPercentage > 70 || isScrolling ? 'opacity-0' : 'opacity-100'"
                        @click="scrollDownOneScreen">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 32 32">
                            <path d="M0 0h32v32H0z" fill="none" />
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="3" d="m6 22l10 8l10-8m-10 8V2" />
                        </svg>
                    </span>
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

const scrollContainer = ref(null);
const { isScrolling, y } = useScroll(scrollContainer);

const scrollPercentage = computed(() => {
    if (!scrollContainer.value) return 0;

    const element = scrollContainer.value;

    const maxScroll = element.scrollHeight - element.clientHeight;

    if (maxScroll === 0) return 0;

    return (y.value / maxScroll) * 100;
})

const scrollDownOneScreen = () => {
    if (scrollContainer.value) {
        
        // Option 1 : Si votre conteneur a sa propre barre de défilement (comme une modale)
        // clientHeight correspond à la hauteur visible exacte de cet élément
        const scrollAmount = scrollContainer.value.clientHeight;

        // Option 2 : Si vous voulez vraiment la hauteur de l'écran entier du navigateur (le vrai 100vh)
        // const scrollAmount = window.innerHeight;

        scrollContainer.value.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
        });
    }
};

const maxTranslateX = computed(() => {
    return -(props.project.gallery?.length - 1) * slideWidth;
});


</script>
