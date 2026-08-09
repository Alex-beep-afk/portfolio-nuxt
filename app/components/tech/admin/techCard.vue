<script setup>

const config = useRuntimeConfig();

const props = defineProps({
  tech: {
    type: Object,
    required: true
  }
});


const deleteTech = (id) => {
  const token = useCookie('auth_token');
  const isConfirmed = confirm("Etes-vous sur de vouloir supprimer cette techno ?");
  
  if (!isConfirmed) {
    return;
  }
  
  $fetch(`${config.public.apiBaseUrl}/api/technos/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/ld+json',
      Authorization: `Bearer ${token.value}`
    }
  })
}

// const toggleActive = (id) => {
//   $fetch(`${config.public.apiBaseUrl}/api/technos/${id}`, {
//     method: 'PATCH',
//     headers: {
//       Accept: 'application/ld+json',
//       'Content-Type': 'application/ld+json'
//     },
//     body: {
//       isActive: !props.tech.isActive
//     }
//   })
// }
</script>

<template>
<div class="border p-2 rounded-md shadow-md flex flex-col items-center">
    <img class="w-16 h-16" :src="tech.logo ? `${config.public.apiBaseUrl}${tech.logo.contentUrl}` : '/medias/images/bg-default.png'" alt="">
    <p>{{ tech.title }}</p>
    <button @click="deleteTech(tech.id)">Supprimer</button>
    <button>Activer</button>
    <!-- <input type="checkbox" :checked="tech.isActive" @change="toggleActive(tech.id)">Activer</input> -->
</div>
</template>