<template>
  <div :id="`choices-${fragmentId}`">
    <button
      v-for="(choice, index) in choices"
      type="button"
      @click="selectChoice(choice, index)"
      :disabled="!!choiceSelected || isCooldown"
      :class="[choice !== choiceSelected ? buttonClass : buttonClassActive]"
    >
      {{ choice }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import anime from 'animejs'
import {
  buttonClass,
  buttonClassActive,
  calculateDistanceBetweenElements,
  delay,
  getRandomEasing,
} from '../utils.ts'

const props = defineProps({
  fragmentId: {
    type: Number,
    required: true,
  },
  choices: {
    type: Array<string>,
    required: true,
  },
})

const emit = defineEmits(['selectChoice'])
const choiceSelected: string = ref('')
const isCooldown: boolean = ref(true)

onMounted(async () => {
  //Throttle
  await delay(2000)
  isCooldown.value = false
})

function selectChoice(choice: string, index: number) {
  choiceSelected.value = choice
  animateUnselectedChoices(choice)
  animateSelectedChoice(index)
  emit('selectChoice', choice)
}

function animateUnselectedChoices(choice: string) {
  props.choices.forEach((value, index) => {
    if (value !== choice) {
      anime({
        targets: `#choices-${props.fragmentId} > button:nth-child(${index + 1})`,
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInQuad',
      })
    }
  })
}

function animateSelectedChoice(index: number) {
  const distance = calculateDistanceBetweenElements(
    `#choices-${props.fragmentId} > button:first-child`,
    `#choices-${props.fragmentId} > button:nth-child(${index + 1})`,
  )

  anime({
    targets: `#choices-${props.fragmentId} > button:nth-child(${index + 1}`,
    translateX: [0, -distance],
    duration: 1000,
    delay: 700,
    easing: getRandomEasing(),
  })
}
</script>
