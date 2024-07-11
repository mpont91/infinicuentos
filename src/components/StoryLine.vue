<template>
  <Loading v-if="isLoading" />
  <div v-show="!isLoading">
    <p id="intro1">
      Estás a punto de vivir una experiencia única! ¿Estás preparado?
    </p>
    <p id="intro2">
      Selecciona el género que más te apasione y tu historia empezará...
    </p>
    <div id="genres" class="my-4">
      <button
        v-for="genre in genres"
        @click="begin(genre)"
        type="button"
        :disabled="!!genreSelected"
        class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        {{ genre }}
      </button>
    </div>
    <ol class="relative border-s border-gray-200 dark:border-gray-700">
      <story-fragment
        v-for="fragment in fragments"
        :text="fragment"
        :id="fragments.length"
        @addFragment="addFragment"
      />
    </ol>
  </div>
</template>
<script setup>
import { reactive, onMounted, ref } from 'vue'
import StoryFragment from './StoryFragment.vue'
import anime from 'animejs'
import { genres } from '../constants/story.ts'
import Loading from './Loading.vue'

const isLoading = ref(true)
const genreSelected = ref('')
const fragments = reactive([])

onMounted(() => {
  isLoading.value = false
  anime({
    targets: '#intro1',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: 100,
    duration: 1000,
    easing: 'easeOutExpo',
  })
  anime({
    targets: '#intro2',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: 400,
    duration: 1000,
    easing: 'easeOutExpo',
  })
  anime({
    targets: '#genres > button',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: 1000,
    duration: 1000,
    easing: 'easeOutExpo',
  })
})

async function begin(genre) {
  genreSelected.value = genre
  const api = await fetch('/api/story-generate')
  const response = await api.json()
  fragments.push(response.message)
}

async function addFragment() {
  const api = await fetch('/api/story-generate')
  const response = await api.json()
  fragments.push(response.message)
}
</script>
