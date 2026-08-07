<script setup>

const config = useRuntimeConfig();
const apiUrl = config.public.apiBaseUrl;

const username = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await $fetch(`${apiUrl}/api/login_check`, {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    const token = useCookie('auth_token', {
      maxAge: 60 * 60 * 24, // Le cookie expirera dans 1 jour (en secondes)
      // secure: true, // À décommenter en production (HTTPS obligatoire)
      // sameSite: 'strict'
    })

    token.value = response.token;

    await navigateTo('/admin/dashboard')
    
  } catch (error) {

    console.error('Erreur login:', error)
    errorMessage.value = "Identifiants incorrects."

  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  
  <div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-white text-2xl text-center mb-12
                font-heading drop-shadow-[0_5px_5px_rgba(59,130,246,0.8)] 
                hover:text-blue-300 transition-colors duration-500 ease-in-out"
    >Connexion Admin</h1>
    <!-- Si on a une erreur (ex: mauvais mot de passe), on l'affiche ici -->
    <div v-if="errorMessage" class="error-msg">
      {{ errorMessage }}
    </div>
    <form class="flex flex-col gap-8" @submit.prevent="handleLogin">

      <div>
        <label for="username">Username</label>
        <input 
          id="username" 
          v-model="username" 
          type="text" 
          required 
          placeholder="Admin"
          class="text-xs md:text-base text-white border w-full p-3  rounded-xl bg-gray-800 
                        focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out 
                        border-white/10 focus:ring-blue-400/80 
                        hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]"
        />
      </div>

      <div>
        <label for="password">Mot de passe</label>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          required
          class="text-xs md:text-base text-white border w-full p-3  rounded-xl bg-gray-800 
                        focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out 
                        border-white/10 focus:ring-blue-400/80 
                        hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]"
        />
      </div>

      <button class="text-white mt-12 border border-blue-500 p-3 rounded-xl bg-gray-950/70 shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]
                        focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out 
                        border-white/10 focus:ring-blue-400/80 
                        hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]"
        type="submit" :disabled="isLoading">
        {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
      </button>

    </form>
  </div>

</template>