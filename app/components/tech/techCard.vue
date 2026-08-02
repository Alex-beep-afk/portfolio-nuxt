<script setup>
    const config = useRuntimeConfig();
    const props = defineProps({
        tech: {
            type: Object,
            required: true
        }
    })
</script>

<template>

    <div class="p-8 bg-slate-900/50 rounded-2xl border border-white/5 flex flex-col gap-4 items-center transition-all 
    hover:border-blue-400/40 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] hover:bg-slate-800">
      <div :style="{backgroundImage: tech.logo ? `url(${$config.public.apiBaseUrl}${tech.logo.contentUrl})` : 'url(/medias/images/bg-default.png)'}"
            class="border border-slate-400/50 bg-slate-900 rounded-2xl w-24 h-24 bg-cover bg-center">
      </div>
      
      <h3 class="text-white text-lg font-heading drop-shadow-[0_5px_5px_rgba(59,130,246,0.8)]">{{ tech.title }}</h3>
    </div>
    
</template>