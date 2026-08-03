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
  <div class="flex justify-center items-center h-screen">
    <h1>Connexion Admin</h1>
    <!-- Si on a une erreur (ex: mauvais mot de passe), on l'affiche ici -->
    <div v-if="errorMessage" class="error-msg">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Email</label>
        <input 
          id="username" 
          v-model="username" 
          type="text" 
          required 
          placeholder="AlexTest"
        />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          required 
        />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
      </button>
    </form>
  </div>
</template>