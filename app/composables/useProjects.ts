// app/composables/useProjects.ts
export const useProjects = () => {
  const projects = useState('projects', () => [])
  const config = useRuntimeConfig()

  // On ajoute un paramètre forceRefresh (faux par défaut)
  const fetchProjects = async (forceRefresh = false) => {
    
    // Si on a déjà des projets ET qu'on ne force pas la mise à jour -> on stoppe pour économiser le réseau
    if (projects.value.length > 0 && !forceRefresh) return 

    try {
      // On utilise $fetch car on est dans une méthode appelée manuellement
      const responseData = await $fetch(`${config.public.apiBaseUrl}/api/projects?active=true`, {
        headers: {
          Accept: 'application/ld+json'
        }
      });
      
      if (responseData && responseData.member) {
        projects.value = responseData.member
      } else {
        projects.value = responseData || []
      }
    } catch (error) {
      console.error("Erreur lors du refresh des projets :", error);
    }
  }

  return { projects, fetchProjects }
}

