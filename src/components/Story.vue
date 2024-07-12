<template>
  <h1 class="text-2xl mt-1 mb-4">Infinicuentos</h1>
  <Loading v-if="isLoading" />
  <div v-show="!isLoading">
    <Introduction />
    <Genre @selectGenre="begin" />
    <ol
      id="storyline"
      class="relative border-s border-gray-200 dark:border-gray-700"
    >
      <Fragment
        v-for="(fragment, index) in fragments"
        :text="fragment.message"
        :id="index + 1"
        :choices="fragment.choices"
        @addFragment="addFragment"
      />
    </ol>
    <LoadingFragment v-if="isLoadingFragment" />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import Loading from './Loading.vue'
import Introduction from './Introduction.vue'
import Genre from './genre.vue'
import Fragment from './Fragment.vue'
import LoadingFragment from './LoadingFragment.vue'
import { delay, minimumDelay, prompt } from '../utils.ts'
import type { CoreMessage } from 'ai'
import type { FragmentType } from '../types.ts'

const isLoading: boolean = ref(true)
const isLoadingFragment: boolean = ref(false)
const fragments: FragmentType[] = reactive([])
const messages: CoreMessage[] = []

onMounted(async () => {
  await delay()
  isLoading.value = false
})

async function begin(genre: string) {
  messages.push({
    role: 'system',
    content: prompt.replace('[genre]', genre),
  })

  await apiRequest()
}

async function addFragment(choice: string) {
  messages.push({
    role: 'user',
    content: choice,
  })

  await apiRequest()
}

async function apiRequest() {
  isLoadingFragment.value = true
  const startTime: number = Date.now()

  const result = await fetch('/api/story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: messages,
    }),
  })

  const fragment: FragmentType = await result.json()

  const elapsedTime: number = Date.now() - startTime
  if (elapsedTime < minimumDelay) {
    await delay(minimumDelay - elapsedTime)
  }

  fragments.push(fragment)
  messages.push({
    role: 'assistant',
    content: fragment.message,
  })

  isLoadingFragment.value = false
}
</script>
