<script setup>
const route = useRoute();

const navLinks = [
    {
        label: 'Dashboard',
        path: '/admin/dashboard'
    },
    {
        label: 'Projets',
        path: "/admin/projets"
    },
    {
        label: 'Technos',
        path: "/admin/technos"
    },
    {
        label: 'Messages',
        path: "/admin/messages"
    }
]

</script>

<template>
    <aside class="flex flex-col p-4 bg-slate-600 h-full w-1/3 gap-4 min-h-screen">
        <UiAdminNavLink 
        v-for = 'link in navLinks' 
        :key = 'link.label' 
        :label = 'link.label'
        :path = 'link.path'
        :isActive = 'route.path === link.path' 
        />
    </aside>

</template>