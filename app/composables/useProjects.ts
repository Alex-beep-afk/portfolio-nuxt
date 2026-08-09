// app/composables/useProjects.ts
export const useProjects = () => {
  const projects = useState('projects', () => [])
  const config = useRuntimeConfig()

  const fetchProjects = async () => {
    if (projects.value.length > 0) return 

    const { data } = await useFetch(`${config.public.apiBaseUrl}/api/projects`, {
      headers: {
        Accept: 'application/ld+json'
      }
    })
    
    const responseData = data.value as any;
    if (responseData && responseData.member) {
      projects.value = responseData.member
    } else {
      projects.value = data.value || []
    }
  }

  return { projects, fetchProjects }
}
