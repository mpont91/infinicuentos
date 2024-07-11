<template>
  <li :class="`fragment-${props.id} mb-10 ms-6`">
    <span
      class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
    >
      <svg
        class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
        ></path>
      </svg>
    </span>
    <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
      {{ props.text }}
    </p>
    <button
      type="button"
      @click="addFragment"
      :disabled="isUsed"
      class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
    >
      Opción A
    </button>
  </li>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['addFragment'])

const isUsed: Boolean = ref(false)

function addFragment() {
  isUsed.value = true
  emit('addFragment')
}
</script>
