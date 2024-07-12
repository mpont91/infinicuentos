<template>
  <li :id="`fragment-${id}`" class="mb-10 ms-6">
    <span
      class="absolute flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-yellow-900"
    >
      <StarIcon />
    </span>
    <p
      class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 text-justify"
    >
      {{ text }}
    </p>
    <Choices :fragmentId="id" :choices="choices" @selectChoice="addFragment" />
  </li>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import anime from 'animejs'
import Choices from './Choices.vue'
import StarIcon from './StarIcon.vue'

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
})

const emit = defineEmits(['addFragment'])

onMounted(() => {
  anime({
    targets: `#fragment-${props.id}`,
    opacity: [0, 1],
    duration: 2500,
    easing: 'easeOutExpo',
  })
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
})

function addFragment(choice: string) {
  emit('addFragment', choice)
}
</script>
