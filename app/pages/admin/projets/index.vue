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
    <section>
        <h1>page projets</h1>
        <ProjectAdminProjectForm @refresh-list="fetchProjects(true)"/>
        
    
    
        <div class="flex flex-row gap-4">
            <ProjectAdminProjectCard v-for="project in projects" :key="project.id" :project="project" @refresh-list="fetchProjects(true)"/>
        </div>
        
    </section>
</template>