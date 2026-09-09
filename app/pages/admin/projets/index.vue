<script setup>

definePageMeta({
    layout: 'admin',
    middleware: ['auth']
})

const config = useRuntimeConfig();


//Appel Api pour les projets
const { projects, fetchProjects } = useProjects();
await fetchProjects();

</script>


<template>
    <div class="flex flex-col gap-8">
        <h1 class="text-blue-500/70 font-bold text-2xl text-center drop-shadow-[0_5px_5px_rgba(59,130,246,1)]">Gestion des projets</h1>
        
        <section class="bg-blue-500/10 rounded-xl shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]">
            <h2 class="p-2.5 bg-blue-500/20 rounded-t-xl text-blue-500/70 font-bold">Créer un nouveau projet</h2>
            <ProjectAdminProjectForm @refresh-list="fetchProjects(true)" />
        </section>

        <section>
            <h2 class="text-blue-500/70 font-bold text-xl drop-shadow-[0_5px_5px_rgba(59,130,246,0.7)] mb-4">Projets enregistrés</h2>
            
            <div v-if="!projects || projects.length === 0">
                <p class="text-gray-400 italic text-center py-4">Aucun projet enregistré</p>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <ProjectAdminProjectCard v-for="project in projects" :key="project.id" :project="project" @refresh-list="fetchProjects(true)" />
            </div>
        </section>
    </div>
</template>