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
    <form @submit.prevent="postProject" class="text-slate-600 flex flex-col gap-2">
        <label for="title">Titre</label>
        <input type="text" v-model="form.title" id="title" name="title">

        <label for="description">Description</label>
        <textarea v-model="form.description" id="description" name="description"></textarea>

        <label for="difficulties">Difficultées</label>
        <textarea v-model="form.difficulties" id="difficulties" name="difficulties"></textarea>

        <label for="github">Lien GitHub</label>
        <input type="text" v-model="form.github" id="github" name="github">

        <label for="url">Lien du site</label>
        <input type="text" v-model="form.url" id="url" name="url">

        <label for="coverImage"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/80 transition-all">

                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                
                    <svg class="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>

                    <p class="mb-2 text-sm text-gray-300">Cliquez pour uploader <span class="font-bold text-blue-500">l'image principale</span></p>

                    
                    <p v-if="form.coverImage" class="text-green-400 font-bold mt-2">Sélectionné : {{ form.coverImage.name }}</p>
                </div>

                <input id="coverImage" ref="coverImageRef" type="file" class="hidden" @change="handleCoverImageUpload" />
            </label>

        <label for="media"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/80 transition-all mt-4">

                <div class="flex flex-col items-center justify-center p-5">
                
                    <svg class="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>

                    <p class="mb-2 text-sm text-gray-300 text-center">Cliquez pour uploader <span class="font-bold text-blue-500">la galerie (plusieurs images)</span></p>
                    
                    <p v-if="form.media && form.media.length > 0" class="text-green-400 font-bold mt-2">
                        Sélectionné : {{ form.media.length }} fichier(s)
                    </p>
                </div>

                <input id="media" ref="mediaRef" name="media" type="file" class="hidden" multiple @change="handleFilesUpload" />
            </label>

        <label class="mb-2 mt-4 text-white">Technologies utilisées</label>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label v-for="tech in technos" :key="tech.id"
                class="flex items-center gap-2 cursor-pointer bg-gray-900 p-2 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors">

                <input type="checkbox" :value="tech['@id']" v-model="form.technos"
                    class="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded">

                <span class="text-sm text-gray-300">{{ tech.title }}</span>
            </label>
        </div>

        <button type="submit" :disabled="isSubmitting">Ajouter</button>
    </form>

    <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>



</template>