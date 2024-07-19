<template>
  <div role="status" class="animate-pulse">
    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mb-5"></div>
    <div class="flex flex-wrap items-center gap-2 mb-10">
      <div class="h-10 bg-gray-300 rounded-lg dark:bg-gray-600 w-48"></div>
      <div class="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 w-36"></div>
      <div class="h-10 bg-gray-300 rounded-lg dark:bg-gray-600 w-52"></div>
      <div class="h-10 bg-gray-300 rounded-lg dark:bg-gray-700 w-full"></div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { scrollToBottom } from '../utils.ts'

onMounted(() => {
  scrollToBottom()
})
</script>
