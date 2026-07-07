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
    <div class="grid grid-cols-1 grid-rows-auto md:grid-cols-2 md:grid-rows-2 gap-20 lg:gap-16 w-full">

        <ProjectCard @showProject="openModalProject(project)" v-for="project in projects" :key="project.id"
            :title="project.title" :description="project.description" :techno="project.techno" :link="project.link"
            :image="project.coverImage?.contentUrl" />

    </div>

    <ProjectModal v-if="isModalOpen" :project="selectedProject" @close="closeModalProject()" />
</template>