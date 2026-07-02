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
                                <button class="text-black text-sm bg-white rounded-md w-8 h-8">
                                    <-- 
                                </button>
                                <button class="text-black text-sm bg-white rounded-md w-8 h-8">
                                    -->
                                </button>
                            </div>

                        </div>
                        <div class="flex gap-4 overflow-x-hidden">
                            <div class="min-w-[240px] h-[160px] cursor-pointer overflow-hidden" v-for="image in project.gallery" :key="image.id">
                                <img :src="`${$config.public.apiBaseUrl}${image.contentUrl}`" :alt="image.title"
                                    class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500">
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
defineProps({
    project: {
        type: Object,
        required: true
    }
})

// La modale a besoin de pouvoir dire "ferme-moi"
defineEmits(['close'])
</script>
