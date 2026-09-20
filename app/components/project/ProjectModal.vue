<script setup>


const props = defineProps({
    project: {
        type: Object,
        required: true
    },
    isOpen: {
        type: Boolean,
        required: true
    }
})


defineEmits(['close']);

// Logique galerie
const galleryContainer = ref(null);
const { x } = useScroll(galleryContainer);

const isAtStart = computed(() => x.value <= 0);
const isAtEnd = computed(() => galleryContainer.value ? (x.value >= galleryContainer.value.scrollWidth - galleryContainer.value.clientWidth - 1) : false);

const slideNext = () => {
    galleryContainer.value.scrollBy({
        left: 256,
        behavior: 'smooth'
    });

}

const slidePrev = () => {
    galleryContainer.value.scrollBy({
        left: -256,
        behavior: 'smooth'
    });
}

//logique galerie ( image ouverte )
const selectedImage = ref(null);

// Logique scroll (arrowbulle + scrollbar custom)
const scrollContainer = ref(null);
const { isScrolling, y } = useScroll(scrollContainer);

const scrollPercentage = computed(() => {
    if (!scrollContainer.value) return 0;

    const element = scrollContainer.value;

    const maxScroll = element.scrollHeight - element.clientHeight;

    if (maxScroll === 0) return 0;
    return (y.value / maxScroll) * 100;
})

//arrowbulle
const scrollDownOneScreen = () => {
    if (scrollContainer.value) {

        const scrollAmount = scrollContainer.value.clientHeight;

        scrollContainer.value.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
        });
    }
};

//scrollbar custom
const displayScrollbarOnScroll = computed(() => {
    if (isScrolling.value && scrollPercentage.value > 7 && scrollPercentage.value < 93) {
        return 'opacity-100'
    } else {
        return 'opacity-0 '
    }

})

</script>



<template>

    <Teleport to="body">

        <transition name="modal">

            <div v-if="isOpen" class="fixed inset-0 bg-black/80 z-[100] flex justify-center items-center p-4 "
                @click="$emit('close')">

                <!-- Wrapper pour avoir une scrollbar custom -->
                <div class="relative w-full max-w-2xl max-h-[80vh] ">

                    <!-- Contenu de la modale -->
                    <div class="modal-content bg-gray-900 border border-slate-400/30 
                    rounded-2xl max-w-2xl max-h-[80vh] w-full overflow-y-scroll 
                    no-scrollbar" @click.stop ref="scrollContainer">

                        <!-- Image de couverture + bouton fermeture -->
                        <div class="w-full">
                            <button @click="$emit('close')"
                                class="absolute top-4 right-4 z-50 bg-white p-2 rounded-full flex items-center justify-center 
                                hover:bg-red-500 transition-all duration-500 ease-in-out hover:text-white text-black text-lg cursor-pointer">

                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                    <path d="M0 0h16v16H0z" fill="none" />
                                    <path fill="currentColor"
                                        d="M12.293 2.293a1 1 0 0 1 1.414 1.414L9.414 8l4.293 4.293a1 1 0 1 1-1.414 1.414L8 9.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L6.586 8L2.293 3.707a1 1 0 1 1 1.414-1.414L8 6.586z" />
                                </svg>
                            </button>

                            <img :src="`${$config.public.apiBaseUrl}${project.coverImage?.contentUrl}`"
                                :alt="project.title"
                                class="object-cover mx-auto border-b border-blue-400 drop-shadow-[0_5px_5px_rgba(59,130,246,0.8)] w-full">
                        </div>

                        <!-- COntenu titre + features + description -->
                        <div class="p-8">
                            <div>
                                <UiScrollReveal class="flex items-center justify-center">
                                    <UiTerminalText :text="project.title" header="h2" :speed="100" :size="42" />
                                </UiScrollReveal>

                                <div v-if="project.features && project.features.length > 0" class="my-8">
                                    <ul class="flex flex-wrap gap-4">
                                        <UiBadge v-for="(feature, index) in project.features" :key="index"
                                            :label="feature" variant="type" />
                                    </ul>
                                </div>

                                <p class="text-blue-300">{{ project.description }}</p>
                            </div>

                            <UiDivider />

                            <!-- Difficultés rencontrées -->
                            <UiScrollReveal class="flex items-center justify-center py-8">
                                <UiTerminalText text="Difficultés rencontrées" header="h2" :speed="100" :size="32" />
                            </UiScrollReveal>
                            <p class="text-blue-300">
                                {{ project.difficulties }}

                            </p>

                            <UiDivider />

                            <!-- Titre galerie + boutons navigation -->
                            <div class="flex justify-between mb-8 items-center">
                                <UiScrollReveal class="flex items-center justify-center py-8">
                                    <UiTerminalText text="Galerie" header="h2" :speed="100" :size="32" />
                                </UiScrollReveal>
                                <div class="flex justify-between gap-4">
                                    <button @click="slidePrev" :disabled="isAtStart" class="text-black text-sm bg-white rounded-sm w-8 h-8 flex justify-center items-center 
                                    hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out 
                                    disabled:opacity-30 disabled:cursor-not-allowed">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                            viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="none" stroke="currentColor" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="1.5"
                                                d="m18.64 19l-5.763-5.763a1.737 1.737 0 0 1 0-2.474L18.64 5m-7 14l-5.763-5.763a1.74 1.74 0 0 1 0-2.474L11.64 5" />
                                        </svg>

                                    </button>

                                    <button @click="slideNext" :disabled="isAtEnd" class="text-black text-sm bg-white rounded-sm w-8 h-8 flex justify-center items-center hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out
                                disabled:opacity-30 disabled:cursor-not-allowed">
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

                            <!-- Carrousel galerie -->
                            <div ref="galleryContainer" class="flex gap-4 overflow-x-auto snap-x 
                                snap-mandatory no-scrollbar w-full py-4">

                                <div class="min-w-[240px] h-[160px] cursor-pointer 
                                    rounded-lg  transition-all duration-300 snap-start overflow-hidden 
                                    hover:ring-2 hover:ring-blue-500 hover:-translate-y-2"
                                    v-for="image in project.gallery" :key="image.id" @click="selectedImage = image">
                                    <img :src="`${$config.public.apiBaseUrl}${image.contentUrl}`" :alt="image.title"
                                        class="w-full h-full object-cover grayscale hover:grayscale-0">
                                </div>

                            </div>

                            <UiDivider />

                            <!-- Technologies utilisées -->
                            <div class="flex flex-col gap-10">
                                <UiScrollReveal class="flex items-center justify-center pt-8">
                                    <UiTerminalText text="Technologies utilisées" header="h2" :speed="100" :size="32" />
                                </UiScrollReveal>

                                <div class="flex flex-wrap gap-4">
                                    <UiBadgeSecondary v-for="tech in project.techno" :key="tech.id"
                                        :label="tech.title" />
                                </div>

                                <!-- Boutons de navigation -->
                                <div class="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-10">
                                    <UiButtonPrimary
                                        :label="!project.link ? 'Projet pas en ligne' : 'Voir le projet en ligne'"
                                        :to="project.link" class="text-center w-full sm:w-auto"
                                        :disabled="!project.link"
                                        :class="!project.link ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''" />

                                    <UiButtonSecondary
                                        :label="!project.githubLink ? 'Projet privé' : 'Voir le projet sur GitHub'"
                                        :to="project.githubLink" class="text-center w-full sm:w-auto"
                                        :disabled="!project.githubLink"
                                        :class="!project.githubLink ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''" />
                                </div>
                            </div>




                        </div>

                        <!-- ArrowBulle -->
                        <div class="sticky bottom-0 z-50 text-blue-500 flex items-center justify-center animate-bounce overflow-hidden "
                            :class="scrollPercentage > 70 || isScrolling ? 'max-h-0 p-0' : 'max-h-24 p-2'">
                            <span
                                class="backdrop-blur-sm p-2 rounded-full shadow-[inset_0_0_20px_rgba(59,130,246,0.5)] transition-opacity duration-500 ease-in-out"
                                :class="scrollPercentage > 70 || isScrolling ? 'opacity-0' : 'opacity-100'"
                                @click="scrollDownOneScreen">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 32 32">
                                    <path d="M0 0h32v32H0z" fill="none" />
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="3" d="m6 22l10 8l10-8m-10 8V2" />
                                </svg>
                            </span>
                        </div>

                    </div>

                    <!-- Conteneur de la scrollbar -->
                    <div class="absolute right-0 top-0 h-full w-4 rounded-full px-1">
                        <!-- Curseur de la scrollbar -->
                        <div :class="displayScrollbarOnScroll"
                            class="h-3 w-full bg-blue-500 rounded-full relative transition-opacity duration-500 ease-in-out"
                            :style="`top:${scrollPercentage}%; transform: translateY(${-scrollPercentage}%);`"></div>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>

    <ProjectLightbox v-if="selectedImage" :selectedImage="selectedImage" @close="selectedImage = null" />

</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
    opacity: 0;
    transform: scale(0.92) translateY(20px);
}
</style>
