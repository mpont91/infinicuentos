<template>
  <form @submit="creativeGenreSelected">
    <div id="genres" class="my-4 flex flex-wrap">
      <button
        v-for="(genre, index) in genres"
        @click="selectGenre(genre, index)"
        type="button"
        :disabled="!!genreSelected"
        :class="[
          !isCreativeGenreSelected && genre === genreSelected
            ? buttonClassActive
            : buttonClass,
        ]"
      >
        {{ genre }}
      </button>
      <div id="creative-genre" class="min-w-96">
        <div class="relative w-1/2">
          <input
            type="text"
            placeholder="Escribe el género..."
            required
            :disabled="!!genreSelected"
            v-model="creativeGenre"
            :class="[
              isCreativeGenreSelected && creativeGenre === genreSelected
                ? buttonClassActive
                : 'block p-2.5 w-full z-20 text-sm rounded-lg border rounded-2 bg-transparent dark:border-blue-500 dark:text-blue-500',
            ]"
          />
          <button
            type="submit"
            :disabled="!!genreSelected"
            class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium rounded-e-lg border focus:ring-4 focus:outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  buttonClass,
  buttonClassActive,
  genres,
  calculateDistanceBetweenElements,
} from '../utils.ts'
import ArrowRightIcon from './ArrowRightIcon.vue'
import { slideUpIn, fadeOutSlow, fadeOutFast, slide } from '../anime.ts'

const emit = defineEmits(['selectGenre'])

const genreSelected: string = ref('')
const creativeGenre: string = ref('')
const isCreativeGenreSelected: boolean = ref(false)

onMounted(() => {
  slideUpIn(['#genres > button', '#creative-genre'], 2000)
})

function selectGenre(genre: string, index: number) {
  genreSelected.value = genre
  animateUnselectedButtons(genre)
  animateSelectedButton(index)
  emit('selectGenre', genre)
}

function creativeGenreSelected(event: Event) {
  event.preventDefault()
  isCreativeGenreSelected.value = true
  selectGenre(creativeGenre.value, genres.length + 1)
  animateCreativeButton()
}

function animateUnselectedButtons(genre: string) {
  genres.forEach((value, index) => {
    if (isCreativeGenreSelected.value || value !== genre) {
      fadeOutSlow([`#genres > button:nth-child(${index + 1})`])
    }
  })

  if (!isCreativeGenreSelected.value) {
    fadeOutSlow(['#creative-genre'])
  }
}

function animateSelectedButton(index: number) {
  const distance: number = calculateDistanceBetweenElements(
    '#genres > button:first-child',
    `#genres > button:nth-child(${index + 1})`,
  )

  slide([`#genres > button:nth-child(${index + 1}`], -distance)
}

function animateCreativeButton() {
  const distance: number = calculateDistanceBetweenElements(
    '#genres > button:first-child',
    `#creative-genre`,
  )

  fadeOutFast(['#creative-genre button'])
  slide(['#creative-genre'], -distance)
}
</script>
