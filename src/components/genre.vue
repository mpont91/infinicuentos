<template>
  <div id="genres" class="my-4">
    <button
      v-for="(genre, index) in genres"
      @click="selectGenre(genre, index)"
      type="button"
      :disabled="!!genreSelected"
      :class="[genre !== genreSelected ? buttonClass : buttonClassActive]"
    >
      {{ genre }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import anime from 'animejs'
import {
  buttonClass,
  buttonClassActive,
  genres,
  calculateDistanceBetweenElements,
  getRandomEasing,
} from '../utils.ts'

const emit = defineEmits(['selectGenre'])
const genreSelected: string = ref('')

onMounted(() => {
  anime({
    targets: '#genres > button',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: 2000,
    duration: 1000,
    easing: 'easeOutExpo',
  })
})

function selectGenre(genre: string, index: number) {
  genreSelected.value = genre
  animateUnselectedButtons(genre)
  animateSelectedButton(index)
  emit('selectGenre', genre)
}

function animateUnselectedButtons(genre: string) {
  genres.forEach((value, index) => {
    if (value !== genre) {
      anime({
        targets: `#genres > button:nth-child(${index + 1})`,
        opacity: [1, 0],
        duration: 800,
        easing: 'easeInQuad',
      })
    }
  })
}

function animateSelectedButton(index: number) {
  const distance: number = calculateDistanceBetweenElements(
    '#genres > button:first-child',
    `#genres > button:nth-child(${index + 1})`,
  )

  anime({
    targets: `#genres > button:nth-child(${index + 1}`,
    translateX: [0, -distance],
    duration: 1000,
    delay: 700,
    easing: getRandomEasing(),
  })
}
</script>
