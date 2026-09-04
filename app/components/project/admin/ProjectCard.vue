<script setup>

const config = useRuntimeConfig();
const token = useCookie('auth_token');



const props = defineProps({
    project: Object,
    required: true
})

const emit = defineEmits(['refreshList']);

const isActive = ref(props.project.active);

const toggleActive = async (id) => {
    const newValue = !isActive.value;

    try {
        const response = await $fetch(`${config.public.apiBaseUrl}/api/projects/${id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/ld+json',
                'Content-Type': 'application/merge-patch+json',
                Authorization: `Bearer ${token.value}`
            },
            body: {
                active: newValue
            }
        });
        isActive.value = newValue;
    }
    catch (error) {
        console.error(error);
    }
}

const deleteProject = async (id) => {
    const isConfirmed = confirm("Etes-vous sur de vouloir supprimer cette projet ?");

    if (!isConfirmed || !token.value ) {
        return;
    }

    try {
        const response = await $fetch(`${config.public.apiBaseUrl}/api/projects/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/ld+json',
                Authorization: `Bearer ${token.value}`
            }
        })
        emit('refreshList');
    }
    catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <article class="shadow-lg p-4 rounded-md 
                flex flex-col items-center gap-4
                transition-all duration-300 ease-in-out"
        :class="isActive ? 'shadow-green-500/50 border border-green-500' : 'shadow-red-500/50 border border-red-500'">
        <img class="w-16 h-16"
            :src="project.coverImage ? `${config.public.apiBaseUrl}${project.coverImage.contentUrl}` : '/medias/images/bg-default.png'"
            alt="">
        <p class="font-bold text-blue-500">{{ project.title }}</p>

        <div class="flex flex-col items-center gap-4">
            <label class="relative inline-flex items-center cursor-pointer">

                <input type="checkbox" class="sr-only peer" :checked="isActive" @change="toggleActive(project.id)">

                <div class="w-11 h-6 bg-red-500 rounded-full transition-colors 
                peer-checked:bg-green-500 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all peer-checked:after:translate-x-full">
                </div>

                <span class="ml-3 text-sm font-medium" :class="isActive ? 'text-green-500' : 'text-red-500'">{{ isActive
                    ? 'Actif' : 'Non actif' }}</span>
            </label>

            <NuxtLink :to="`/admin/projets/${project.id}`" 
                class="shadow-md shadow-green-500/50 text-green-500 
                font-bold flex gap-1 items-center border border-green-500 px-4 py-2 rounded 
                hover:cursor-pointer hover:bg-green-500/50 hover:text-green-100 transition-colors duration-300 ease-in-out w-full">
                
                <svg class="w-5 h-5 drop-shadow-[0_2px_5px_rgba(28,231,13,1)]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor"
                        d="m21.558 3.592l-1.15-1.15a1.49 1.49 0 0 0-2.12 0L13 7.731V11h3.27l5.288-5.288a1.49 1.49 0 0 0 0-2.12M15.579 9.45h-1.03V8.42L18 4.973l1.03 1.03Z" />
                    <path fill="currentColor"
                        d="M19 19H5V5h6V3H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2v-6h-2Z" />
                </svg>

                Modifier
            </NuxtLink>

            <button
                class="shadow-md shadow-red-500/50 text-red-500 
                font-bold flex gap-1 items-center border border-red-500 px-4 py-2 rounded 
                hover:cursor-pointer hover:bg-red-500/50 hover:text-red-100 transition-colors duration-300 ease-in-out w-full" @click="deleteProject(project.id)">
                <svg class="w-5 h-5 drop-shadow-[0_2px_5px_rgba(248,51,51,1)]" xmlns="http://www.w3.org/2000/svg"
                    width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5" />
                </svg>
                Supprimer
            </button>


        </div>
    </article>
</template>