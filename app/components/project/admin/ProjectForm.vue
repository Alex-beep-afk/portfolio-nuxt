<script setup>

const config = useRuntimeConfig();
const token = useCookie('auth_token');

// Création des variables reactives
const isSubmitting = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const coverImageRef = ref(null);
const mediaRef = ref(null);

const emit = defineEmits(['refreshList']);

const { data: techData } = await useFetch(`${config.public.apiBaseUrl}/api/technos`, {
    server: false,
    headers: {
        Accept: 'application/ld+json'
    }
});

const technos = computed(() => {
    return techData.value ? techData.value.member : [];
});

const form = reactive({
    title: '',
    description: '',
    difficulties: '',
    github: '',
    url: '',
    media: [],
    technos: [],
    coverImage: ''
})

const postProject = async () => {

    isSubmitting.value = true;
    successMessage.value = '';
    errorMessage.value = '';

    const uploadPromises = [];
    const files = form.media;
    const coverImage = form.coverImage;
    let coverImageId = '';

    try {
        

        if (coverImage) {
            const formData = new FormData();
            formData.append('file', coverImage);

            const uploadedCoverImage = await $fetch(`${config.public.apiBaseUrl}/api/media_objects`, {
                method: 'POST',
                headers: {
                    Accept: 'application/ld+json',
                    Authorization: `Bearer ${token.value}`
                },
                body: formData
            })

            coverImageId = uploadedCoverImage['@id'];
        }




        if (files) {
            

            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);

                const promise = $fetch(`${config.public.apiBaseUrl}/api/media_objects`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/ld+json',
                        Authorization: `Bearer ${token.value}`
                    },
                    body: formData
                })

                uploadPromises.push(promise);
            }
        }

        const uploadedMedias = await Promise.all(uploadPromises);

        const mediaIds = uploadedMedias.map((media) => media['@id']);

        const response = await $fetch(`${config.public.apiBaseUrl}/api/projects`, {
            method: 'POST',
            headers: {
                Accept: 'application/ld+json',
                'Content-Type': 'application/ld+json',
                Authorization: `Bearer ${token.value}`
            },
            body: {
                title: form.title,
                description: form.description,
                difficulties: form.difficulties,
                githubLink: form.github,
                link: form.url,
                gallery: mediaIds,
                techno: form.technos,
                coverImage: coverImageId
            }
        })

        successMessage.value = "Projet créé avec succès !";
        form.title = '';
        form.description = '';
        form.difficulties = '';
        form.github = '';
        form.url = '';
        form.media = [];
        form.technos = [];
        form.coverImage = '';

        if (coverImageRef.value || mediaRef.value){
            coverImageRef.value.value = '';
            mediaRef.value.value = '';
        }

        emit('refreshList');
    }
    catch (error) {
        console.error('Erreur lors du telechargement des medias : ', error);
        errorMessage.value = "Une erreur est survenue, veuillez réessayer.";
    }
    finally {
        isSubmitting.value = false;
    }


}


const handleFilesUpload = (event) => {
    const files = event.target.files;

    if (files) {
        form.media = files;
    }
}

const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
        form.coverImage = file;
    }
}

</script>

<template>
    <form @submit.prevent="postProject" class="flex flex-col bg-black gap-6 p-4 md:p-6 border border-blue-500/10 rounded-b-xl">
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

        <!-- Uploads: Cover image & Galerie -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Image principale -->
            <div class="flex flex-col gap-1">
                <span class="text-white text-sm font-medium">Image principale</span>
                <label for="coverImage"
                    class="flex flex-col items-center justify-center w-full min-h-[140px] p-4 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/80 hover:border-blue-500/50 transition-all group">
                    <div class="flex flex-col items-center justify-center text-center">
                        <svg class="w-8 h-8 mb-3 text-gray-400 group-hover:text-blue-400 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-1 text-sm text-gray-300">
                            Cliquez pour uploader <span class="font-bold text-blue-500">l'image principale</span>
                        </p>
                        <p v-if="form.coverImage" class="text-green-400 font-bold mt-2 text-xs">
                            Sélectionné : {{ form.coverImage.name }}
                        </p>
                    </div>
                    <input id="coverImage" ref="coverImageRef" type="file" class="hidden" @change="handleCoverImageUpload" />
                </label>
            </div>

            <!-- Galerie photos -->
            <div class="flex flex-col gap-1">
                <span class="text-white text-sm font-medium">Galerie médias</span>
                <label for="media"
                    class="flex flex-col items-center justify-center w-full min-h-[140px] p-4 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/80 hover:border-blue-500/50 transition-all group">
                    <div class="flex flex-col items-center justify-center text-center">
                        <svg class="w-8 h-8 mb-3 text-gray-400 group-hover:text-blue-400 transition-colors" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p class="mb-1 text-sm text-gray-300">
                            Cliquez pour uploader <span class="font-bold text-blue-500">la galerie</span>
                        </p>
                        <p v-if="form.media && form.media.length > 0" class="text-green-400 font-bold mt-2 text-xs">
                            Sélectionné : {{ form.media.length }} fichier(s)
                        </p>
                    </div>
                    <input id="media" ref="mediaRef" name="media" type="file" class="hidden" multiple @change="handleFilesUpload" />
                </label>
            </div>
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
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
        >
            <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isSubmitting ? 'Création en cours...' : 'Créer le projet' }}</span>
        </button>
    </form>
</template>