<template>
  <li :id="`story-fragment-${id}`" class="mb-10 ms-6">
    <span
      class="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900"
      :class="[
        isError
          ? 'bg-red-300 dark:bg-red-700'
          : 'bg-yellow-300 dark:bg-yellow-700',
      ]"
    >
      <AlertIcon class="w-5 h-5" v-if="isError" />
      <StarIcon class="w-5 h-5" v-else />
    </span>
    <p
      class="story-content-text mb-4 text-base font-normal text-gray-500 dark:text-gray-200 text-justify"
    >
      {{ text }}
    </p>
    <StoryChoices
      :fragmentId="id"
      :choices="choices"
      :isError="isError"
      @selectChoice="selectChoice"
    />
  </li>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import StoryChoices from './StoryChoices.vue'
import StarIcon from '../icons/StarIcon.vue'
import AlertIcon from '../icons/AlertIcon.vue'
import { showStoryFragment } from '../anime.ts'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  choices: {
    type: Array,
    required: true,
  },
  isError: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['addStoryFragment', 'retryStoryFragment'])

onMounted(() => {
  showStoryFragment([`#story-fragment-${props.id}`])
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
})

function selectChoice(choice: string) {
  if (props.isError) {
    emit('retryStoryFragment')
  } else {
    emit('addStoryFragment', choice)
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Cinzel';
  src:
    url('../fonts/Cinzel-Regular.woff2') format('woff2'),
    url('../fonts/Cinzel-Regular.woff') format('woff'),
    url('../fonts/Cinzel-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

.story-content-text {
  font-family: 'Cinzel', sans-serif;
}
</style>
