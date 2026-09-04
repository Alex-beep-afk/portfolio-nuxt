<script setup>

definePageMeta({
    layout: 'admin'
})

const route = useRoute();

const config = useRuntimeConfig();
const token = useCookie('auth_token');

const projectId = route.params.id;
const project = ref(null);

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
    <section>
        <form @submit.prevent="updateProject" class="text-slate-600 flex flex-col gap-2">
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

            <div class="flex flex-col">
                <p class="text-white mb-2 font-bold">Image principale actuelle :</p>

                <div v-if="project && project.coverImage"
                    class="mb-2 mt-4 flex flex-col lg:flex-row gap-2">
                    <div class="w-full lg:w-32 lg:h-32">
                        <img :src="`${config.public.apiBaseUrl}${project.coverImage.contentUrl}`"
                            class=" rounded-lg border border-gray-600 shadow-lg" />
                    </div>

                    <label for="coverImage"
                        class="w-full lg:w-32 lg:h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/80 transition-all">

                        <div class="flex flex-col items-center justify-center pt-5 pb-6">

                            <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                            </svg>

                            <p v-if="project && !form.coverImage">Modifier l'image principale</p>


                            <p v-if="form.coverImage" class="text-green-400 font-bold mt-2">Sélectionné : {{
                                form.coverImage.name }}</p>
                        </div>

                        <input id="coverImage" ref="coverImageRef" type="file" class="hidden"
                            @change="handleCoverImageUpload" />
                    </label>
                </div>

            </div>



            <!-- Visuel de la Galerie actuelle -->
            <div v-if="project && project.gallery && project.gallery.length > 0" class="mb-2 mt-4">
                <p class="text-white mb-2 font-bold">Galerie actuelle ({{ project.gallery.length }} images) :</p>
                <div class="flex gap-3 flex-col">
                    <div v-for="img in project.gallery" :key="img.id" class="relative group">
                        <img :src="`${config.public.apiBaseUrl}${img.contentUrl}`"
                            class="block w-20 h-20 object-cover rounded-lg border border-gray-600 shadow-md" />

                        <!-- Bouton supprimer -->
                        <button type="button" @click="removeGalleryImage(img.id)"
                            class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-lg h-5 w-5 flex items-center justify-center z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <label for="media"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/80 transition-all mt-4">

                <div class="flex flex-col items-center justify-center pt-5 pb-6">

                    <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                        viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                    </svg>
                    <p class="mb-2 text-sm text-gray-300">Cliquer pour ajouter des images à la galerie</p>

                    <p v-if="form.media && form.media.length > 0" class="text-green-400 font-bold mt-2">
                        Sélectionné : {{ form.media.length }} fichier(s)
                    </p>
                </div>

                <input id="media" ref="mediaRef" name="media" type="file" class="hidden" multiple
                    @change="handleFilesUpload" />
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

            <button type="submit" :disabled="isSubmitting">Modifier</button>
        </form>

        <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    </section>
</template>