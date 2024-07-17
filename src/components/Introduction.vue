<template>
  <div id="introduction">
    <p>Estás a punto de vivir una experiencia única! ¿Estás preparado?</p>
    <p>Selecciona el género que más te apasione y tu historia empezará...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { slideUpIn } from '../anime.ts'

onMounted(async () => {
  slideUpIn(['#introduction > p:nth-child(1)'], 100)
  slideUpIn(['#introduction > p:nth-child(2)'], 300)
})
</script>
