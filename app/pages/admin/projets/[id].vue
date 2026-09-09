<script setup>

definePageMeta({
    layout: 'admin'
})

const route = useRoute();

const config = useRuntimeConfig();
const token = useCookie('auth_token');

const projectId = route.params.id;
const project = ref(null);
const { projects, fetchProjects } = useProjects();

const isSubmitting = ref(false);

const successMessage = ref('');
const errorMessage = ref('');

const { data: techData } = await useFetch(`${config.public.apiBaseUrl}/api/technos`, {
    server: false,
    headers: {
        Accept: 'application/ld+json'
    }
});

const technos = computed(() => {
    return techData.value ? techData.value.member : [];
});

const fetchProject = async () => {
    try {
        const response = await $fetch(`${config.public.apiBaseUrl}/api/projects/${projectId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/ld+json',
                Authorization: `Bearer ${token.value}`
            }
        });

        project.value = response;
        form.title = project.value.title;
        form.description = project.value.description;
        form.difficulties = project.value.difficulties;
        form.github = project.value.githubLink;
        form.url = project.value.link;
        form.technos = project.value.techno.map(techno => techno['@id']);
    }
    catch (error) {
        console.error(error);
    }
}

fetchProject();

const form = reactive({
    title: '',
    description: '',
    difficulties: '',
    github: '',
    url: '',
    media: [],
    technos: [],
    coverImage: ''
});

const updateProject = async () => {
    isSubmitting.value = true;
    successMessage.value = '';
    errorMessage.value = '';

    try {
        let newCoverId = null;
        if (form.coverImage) {
            const coverFormData = new FormData();
            coverFormData.append('file', form.coverImage);
            const coverResponse = await $fetch(`${config.public.apiBaseUrl}/api/media_objects`, {
                method: 'POST',
                headers: { Accept: 'application/ld+json', Authorization: `Bearer ${token.value}` },
                body: coverFormData
            });
            newCoverId = coverResponse['@id'];
        }

        let newGalleryIds = [];
        if (form.media && form.media.length > 0) {
            const uploadPromises = [];
            for (const file of form.media) {
                const formData = new FormData();
                formData.append('file', file);
                uploadPromises.push($fetch(`${config.public.apiBaseUrl}/api/media_objects`, {
                    method: 'POST',
                    headers: { Accept: 'application/ld+json', Authorization: `Bearer ${token.value}` },
                    body: formData
                }));
            }
            const uploadedMedias = await Promise.all(uploadPromises);
            newGalleryIds = uploadedMedias.map(media => media['@id']);
        }

        const requestBody = {
            title: form.title,
            description: form.description,
            difficulties: form.difficulties,
            githubLink: form.github,
            link: form.url,
            techno: form.technos,
        };

        if (newCoverId) {
            requestBody.coverImage = newCoverId;
        }

        if (newGalleryIds.length > 0) {
            const oldGalleryIds = project.value.gallery.map(img => img['@id']);
            requestBody.gallery = [...oldGalleryIds, ...newGalleryIds];
        }

        const response = await $fetch(`${config.public.apiBaseUrl}/api/projects/${projectId}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/ld+json',
                'Content-Type': 'application/merge-patch+json',
                Authorization: `Bearer ${token.value}`
            },
            body: requestBody
        });

        successMessage.value = "Projet modifié avec succès !";

        project.value = response;
        form.coverImage = '';
        form.media = [];

        await fetchProjects(true);

        setTimeout(() => {
            if (successMessage.value) successMessage.value = '';
            if (errorMessage.value) errorMessage.value = '';
        }, 3000);

        

    } catch (error) {
        console.error('Erreur lors de la modification : ', error);
        errorMessage.value = "Une erreur est survenue lors de la sauvegarde.";
    } finally {
        isSubmitting.value = false;
    }
}

const handleCoverImageUpload = (event) => { form.coverImage = event.target.files[0]; }
const handleFilesUpload = (event) => { form.media = event.target.files; }

const removeGalleryImage = (imageId) => {
    // On filtre la galerie pour retirer l'image cliquée
    project.value.gallery = project.value.gallery.filter(img => img.id !== imageId);
}



</script>

<template>
    <div class="flex flex-col gap-8">
        <!-- Titre & fil d'Ariane -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <NuxtLink to="/admin/projets" class="inline-flex items-center gap-1.5 text-sm text-blue-400/80 hover:text-blue-300 transition-colors mb-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour aux projets
                </NuxtLink>
                <h1 class="text-blue-500/70 font-bold text-2xl drop-shadow-[0_5px_5px_rgba(59,130,246,1)]">
                    Modifier le projet
                </h1>
            </div>
            <span v-if="project" class="text-xs text-blue-300 font-mono px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 self-start sm:self-auto truncate max-w-[200px]">
                {{ project.title }}
            </span>
        </div>

        <section class="bg-blue-500/10 rounded-xl shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]">
            <h2 class="p-2.5 bg-blue-500/20 rounded-t-xl text-blue-500/70 font-bold">Édition des informations</h2>

            <form @submit.prevent="updateProject" class="flex flex-col bg-black gap-6 p-4 md:p-6 border border-blue-500/10 rounded-b-xl">
                <!-- Titre -->
                <div class="flex flex-col gap-1">
                    <label for="title" class="text-white text-sm font-medium">Titre</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Ex: Mon Portfolio Nuxt"
                        v-model="form.title"
                        class="p-2.5 rounded-lg bg-black text-white border border-white/10 
                        shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                        hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.50)]
                        focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:border-blue-400/40 
                        focus:shadow-[0_0_30px_-5px_rgba(59,130,246,0.75)]
                        transition-all duration-300 placeholder:text-gray-600 text-sm"
                    >
                </div>

                <!-- Liens GitHub & Démo -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <label for="github" class="text-white text-sm font-medium">Lien GitHub</label>
                        <input
                            type="text"
                            id="github"
                            name="github"
                            placeholder="https://github.com/votre-compte/projet"
                            v-model="form.github"
                            class="p-2.5 rounded-lg bg-black text-white border border-white/10 
                            shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                            hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.50)]
                            focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:border-blue-400/40 
                            focus:shadow-[0_0_30px_-5px_rgba(59,130,246,0.75)]
                            transition-all duration-300 placeholder:text-gray-600 text-sm"
                        >
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="url" class="text-white text-sm font-medium">Lien du site</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            placeholder="https://mon-projet.com"
                            v-model="form.url"
                            class="p-2.5 rounded-lg bg-black text-white border border-white/10 
                            shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                            hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.50)]
                            focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:border-blue-400/40 
                            focus:shadow-[0_0_30px_-5px_rgba(59,130,246,0.75)]
                            transition-all duration-300 placeholder:text-gray-600 text-sm"
                        >
                    </div>
                </div>

                <!-- Description & Difficultés -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <label for="description" class="text-white text-sm font-medium">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Présentation et objectifs du projet..."
                            v-model="form.description"
                            class="p-2.5 rounded-lg bg-black text-white border border-white/10 
                            shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                            hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.50)]
                            focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:border-blue-400/40 
                            focus:shadow-[0_0_30px_-5px_rgba(59,130,246,0.75)]
                            transition-all duration-300 placeholder:text-gray-600 text-sm resize-y"
                        ></textarea>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="difficulties" class="text-white text-sm font-medium">Difficultés</label>
                        <textarea
                            id="difficulties"
                            name="difficulties"
                            rows="4"
                            placeholder="Défis techniques rencontrés et solutions..."
                            v-model="form.difficulties"
                            class="p-2.5 rounded-lg bg-black text-white border border-white/10 
                            shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                            hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.50)]
                            focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:border-blue-400/40 
                            focus:shadow-[0_0_30px_-5px_rgba(59,130,246,0.75)]
                            transition-all duration-300 placeholder:text-gray-600 text-sm resize-y"
                        ></textarea>
                    </div>
                </div>

                <!-- Section Image principale (actuelle + modification) -->
                <div class="flex flex-col gap-2">
                    <span class="text-white text-sm font-medium">Image principale</span>
                    
                    <div class="grid grid-cols-1" :class="project && project.coverImage ? 'md:grid-cols-2 gap-4' : ''">
                        <!-- Image principale actuelle -->
                        <div v-if="project && project.coverImage" class="flex flex-col gap-1.5">
                            <span class="text-xs text-gray-400 font-medium">Actuelle</span>
                            <div class="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-gray-950 flex items-center justify-center group shadow-[0_0_20px_-5px_rgba(59,130,246,0.25)]">
                                <img :src="`${config.public.apiBaseUrl}${project.coverImage.contentUrl}`"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    alt="Couverture actuelle" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                                    <span class="text-xs text-blue-300 font-semibold">Image en ligne</span>
                                </div>
                            </div>
                        </div>

                        <!-- Zone de modification -->
                        <div class="flex flex-col gap-1.5">
                            <span class="text-xs text-gray-400 font-medium">{{ project && project.coverImage ? 'Remplacer' : 'Ajouter' }}</span>
                            <label for="coverImage"
                                class="flex flex-col items-center justify-center w-full h-36 p-4 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/80 hover:border-blue-500/50 transition-all group">
                                <div class="flex flex-col items-center justify-center text-center">
                                    <svg class="w-8 h-8 mb-2 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p class="text-xs sm:text-sm text-gray-300">
                                        Cliquez pour <span class="font-bold text-blue-500">changer l'image</span>
                                    </p>
                                    <p v-if="form.coverImage" class="text-green-400 font-bold mt-1 text-xs">
                                        ✓ Sélectionné : {{ form.coverImage.name }}
                                    </p>
                                </div>
                                <input id="coverImage" ref="coverImageRef" type="file" class="hidden" accept="image/*" @change="handleCoverImageUpload" />
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Visuel de la Galerie actuelle -->
                <div v-if="project && project.gallery && project.gallery.length > 0" class="flex flex-col gap-2">
                    <div class="flex items-center justify-between">
                        <span class="text-white text-sm font-medium">Galerie actuelle</span>
                        <span class="text-xs text-blue-400 font-mono">{{ project.gallery.length }} image(s)</span>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        <div v-for="img in project.gallery" :key="img.id"
                            class="relative group aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-red-500/50 transition-all bg-gray-950 shadow-md">
                            <img :src="`${config.public.apiBaseUrl}${img.contentUrl}`"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                alt="Image galerie" />

                            <!-- Bouton supprimer avec halo rouge -->
                            <button type="button" @click="removeGalleryImage(img.id)" title="Retirer l'image"
                                class="absolute top-1 right-1 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-1 shadow-lg h-6 w-6 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Ajouter des images à la galerie -->
                <div class="flex flex-col gap-1.5">
                    <span class="text-white text-sm font-medium">Ajouter à la galerie</span>
                    <label for="media"
                        class="flex flex-col items-center justify-center w-full min-h-[130px] p-4 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/80 hover:border-blue-500/50 transition-all group">
                        <div class="flex flex-col items-center justify-center text-center">
                            <svg class="w-8 h-8 mb-2 text-gray-400 group-hover:text-blue-400 transition-colors" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p class="mb-1 text-sm text-gray-300">
                                Cliquez pour ajouter <span class="font-bold text-blue-500">de nouvelles images</span>
                            </p>
                            <p class="text-xs text-gray-500">Sélectionnez une ou plusieurs images</p>
                            <p v-if="form.media && form.media.length > 0" class="text-green-400 font-bold mt-2 text-xs">
                                ✓ {{ form.media.length }} nouveau(x) fichier(s) sélectionné(s)
                            </p>
                        </div>
                        <input id="media" ref="mediaRef" name="media" type="file" class="hidden" multiple accept="image/*" @change="handleFilesUpload" />
                    </label>
                </div>

                <!-- Technologies -->
                <div class="flex flex-col gap-2">
                    <label class="text-white text-sm font-medium">Technologies utilisées</label>
                    <div v-if="technos && technos.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        <label
                            v-for="tech in technos"
                            :key="tech.id"
                            class="flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer select-none transition-all duration-200"
                            :class="form.technos.includes(tech['@id'])
                                ? 'border-blue-500/80 bg-blue-500/10 text-white shadow-[0_0_15px_-3px_rgba(59,130,246,0.35)]'
                                : 'border-white/10 bg-gray-950/60 text-gray-300 hover:border-blue-500/40 hover:bg-gray-900/60'"
                        >
                            <input
                                type="checkbox"
                                :value="tech['@id']"
                                v-model="form.technos"
                                class="w-4 h-4 rounded bg-gray-900 border-gray-600 text-blue-500 focus:ring-blue-400 focus:ring-offset-0 focus:ring-1 cursor-pointer accent-blue-500"
                            />
                            <span class="text-xs sm:text-sm font-medium truncate">{{ tech.title }}</span>
                        </label>
                    </div>
                    <p v-else class="text-sm text-gray-500 italic">Aucune technologie disponible</p>
                </div>

                <!-- Feedback Messages -->
                <div class="flex items-center justify-center">
                    <UiTerminalText v-if="successMessage" :text="successMessage" :speed="50" :size="20" :colorText="'text-green-300'"
                        :colorCursor="'bg-green-300'" />
                    <UiTerminalText v-if="errorMessage" :text="errorMessage" :speed="50" :size="20" :colorText="'text-red-300'"
                        :colorCursor="'bg-red-300'" />
                </div>

                <!-- Bouton de soumission -->
                <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="text-white border border-blue-500 p-3 
                    rounded-xl bg-gray-950/70 
                    shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                    focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out 
                    border-white/10 focus:ring-blue-400/80 
                    hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.75)]
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium cursor-pointer"
                >
                    <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{{ isSubmitting ? 'Sauvegarde en cours...' : 'Enregistrer les modifications' }}</span>
                </button>
            </form>
        </section>
    </div>
</template>