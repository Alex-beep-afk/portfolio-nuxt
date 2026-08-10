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

        <label for="coverImage">Image principale</label>
        <input type="file" ref="coverImageRef" id="coverImage" name="coverImage" @change="handleCoverImageUpload">

        <label for="media">Gallerie de médias</label>
        <input type="file" ref="mediaRef" id="media" name="media" multiple @change="handleFilesUpload">

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