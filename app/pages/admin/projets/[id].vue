<script setup>
definePageMeta({
    layout: 'admin'
})

const route = useRoute();
const config = useRuntimeConfig();
const token = useCookie('auth_token');

const projectId = route.params.id;
const project = ref(null);

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
    }
    catch (error) {
        console.error(error);
    }
}

fetchProject();
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

            <ProjectAdminProjectForm :project="project" v-if="project" @refresh-list="fetchProject" />
        </section>
    </div>
</template>