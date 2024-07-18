<template>
  <form @submit="creativeChoiceSelected">
    <div :id="`choices-${fragmentId}`" class="flex flex-wrap">
      <button
        v-for="(choice, index) in choices"
        type="button"
        @click="selectChoice(choice, index)"
        :disabled="!!choiceSelected || isCooldown"
        :class="[
          !isCreativeChoiceSelected && choice === choiceSelected
            ? buttonClassActive
            : buttonClass,
        ]"
      >
        {{ choice }}
      </button>
      <div id="creative-choice" class="w-full">
        <div class="relative">
          <input
            type="text"
            placeholder="Escribe tu continuación..."
            required
            :disabled="!!choiceSelected"
            v-model="creativeChoice"
            :class="[
              isCreativeChoiceSelected && creativeChoice === choiceSelected
                ? [buttonClassActive, 'w-full']
                : 'block p-2.5 w-full z-20 text-sm rounded-lg border rounded-2 bg-transparent dark:border-blue-500 dark:text-blue-500',
            ]"
          />
          <button
            type="submit"
            :disabled="!!choiceSelected"
            class="absolute top-0 end-0 px-2.5 h-full text-sm font-medium rounded-e-lg border focus:ring-4 focus:outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            <ChevronRightIcon />
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
  calculateDistanceBetweenElements,
  delay,
  throttle,
} from '../utils.ts'
import { fadeOutFast, fadeOutSlow, slide } from '../anime.ts'
import ChevronRightIcon from '../icons/ChevronRightIcon.vue'

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
const creativeChoice: string = ref('')
const isCreativeChoiceSelected: boolean = ref(false)
const isCooldown: boolean = ref(true)

onMounted(async () => {
  await delay(throttle)
  isCooldown.value = false
})

function selectChoice(choice: string, index: number) {
  choiceSelected.value = choice
  animateUnselectedChoices(choice)
  animateSelectedChoice(index)
  emit('selectChoice', choice)
}

function creativeChoiceSelected(event: Event) {
  event.preventDefault()
  isCreativeChoiceSelected.value = true
  selectChoice(creativeChoice.value, 4)
  animateCreativeButton()
}

function animateUnselectedChoices(choice: string) {
  props.choices.forEach((value, index) => {
    if (isCreativeChoiceSelected.value || value !== choice) {
      fadeOutSlow([
        `#choices-${props.fragmentId} > button:nth-child(${index + 1})`,
      ])
    }
  })

  if (!isCreativeChoiceSelected.value) {
    fadeOutSlow([`#choices-${props.fragmentId} #creative-choice`])
  }
}

function animateSelectedChoice(index: number) {
  const distance = calculateDistanceBetweenElements(
    `#choices-${props.fragmentId} > button:first-child`,
    `#choices-${props.fragmentId} > button:nth-child(${index + 1})`,
  )

  slide(
    [`#choices-${props.fragmentId} > button:nth-child(${index + 1}`],
    -distance,
  )
}

function animateCreativeButton() {
  const distance: number = calculateDistanceBetweenElements(
    `#choices-${props.fragmentId} > button:first-child`,
    `#choices-${props.fragmentId} #creative-choice`,
  )

  fadeOutFast([`#choices-${props.fragmentId} #creative-choice button`])
  slide([`#choices-${props.fragmentId} #creative-choice`], -distance)
}
</script>
