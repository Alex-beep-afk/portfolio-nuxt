<script setup>
const props = defineProps({
    projects: {
        type: Array,
        required: true
    }
})

//Gestion de l'ouverture et de la fermeture de la modale
const isModalOpen = ref(false)

const selectedProject = ref(null)

const isLocked = useScrollLock(typeof document !== 'undefined' ? document.body : null)

const openModalProject = (project) => {
    selectedProject.value = project
    isModalOpen.value = true
    isLocked.value = true
}

const closeModalProject = () => {
    isModalOpen.value = false
    isLocked.value = false
}
</script>

<template>
    <div class="grid grid-cols-1 grid-rows-auto lg:grid-cols-2 lg:grid-rows-2 gap-20 lg:gap-16 w-full">

        <ProjectCard @showProject="openModalProject(project)" v-for="project in projects" :key="project.id"
            :project="project" />

    </div>

    <ProjectModal 
    v-if="selectedProject" 
    :is-open="isModalOpen" 
    :project="selectedProject" 
    @close="closeModalProject" 
/>
</template>