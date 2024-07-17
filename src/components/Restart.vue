<template>
  <button
    type="button"
    class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md py-3 px-8 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
    @click="$emit('restart')"
    :disabled="isDisabled"
  >
    <RefreshIcon class="me-2" v-if="isStarted" />
    <span v-if="isStarted">Volver a empezar</span>
    <span v-if="isStarted" class="sr-only">Restart</span>

    <BookIcon class="me-2" v-if="!isStarted" />
    <span v-if="!isStarted">Empezar</span>
    <span v-if="!isStarted" class="sr-only">Empezar</span>
  </button>
</template>

<script setup lang="ts">
import RefreshIcon from '../icons/RefreshIcon.vue'
import BookIcon from '../icons/BookIcon.vue'

defineProps({
  isDisabled: {
    type: Boolean,
    required: true,
  },
  isStarted: {
    type: Boolean,
    required: true,
  },
})
</script>
