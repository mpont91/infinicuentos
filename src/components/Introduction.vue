<template>
  <div id="introduction">
    <p>Estás a punto de vivir una experiencia única! ¿Estás preparado?</p>
    <p>Selecciona el género que más te apasione y tu historia empezará...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import anime from 'animejs'

onMounted(async () => {
  anime({
    targets: '#introduction > p:nth-child(1)',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: 1200,
    duration: 1000,
    easing: 'easeOutExpo',
  })
  anime({
    targets: '#introduction > p:nth-child(2)',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: 1600,
    duration: 1000,
    easing: 'easeOutExpo',
  })
})
</script>
