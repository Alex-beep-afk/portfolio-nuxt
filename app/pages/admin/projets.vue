<script setup>

definePageMeta({
    layout: 'admin'
})

const config = useRuntimeConfig();

//Appel Api pour les projets
const { projects, fetchProjects } = useProjects();
await fetchProjects();

</script>


<template>
    <h1>page projets</h1>
    <ul>
        <li v-for="project in projects" :key="project.id">
            {{ project.title }}
        </li>
    </ul>
</template>