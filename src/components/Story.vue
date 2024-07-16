<template>
  <div class="flex mt-1 mb-4">
    <h1 class="text-2xl flex-1">Infinicuentos</h1>
    <Restart
      :isDisabled="restartIsDisabled"
      @restart="restart"
      class="flex-none"
    />
  </div>
  <Loading v-if="isLoading" />
  <div :key="renderKey" id="content" v-show="!isLoading">
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
        :isError="fragment.isError"
        @addFragment="addFragment"
        @retry="retry"
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
import Restart from './Restart.vue'
import { delay, throttle, prompt } from '../utils.ts'
import type { CoreMessage } from 'ai'
import type { FragmentType } from '../types.ts'
import anime from 'animejs'

const isLoading: boolean = ref(true)
const isLoadingFragment: boolean = ref(false)
const fragments: FragmentType[] = reactive([])
const messages: CoreMessage[] = []
const renderKey: number = ref(0)
const restartIsDisabled: boolean = ref(false)

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

async function retry() {
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
  if (elapsedTime < throttle) {
    await delay(throttle - elapsedTime)
  }

  fragments.push(fragment)

  if (result.status === 200) {
    messages.push({
      role: 'assistant',
      content: fragment.message,
    })
  }

  isLoadingFragment.value = false
}

async function restart() {
  restartIsDisabled.value = true
  anime({
    targets: `#content`,
    opacity: [1, 0],
    translateY: 1000,
    duration: 2500,
    easing: 'easeOutExpo',
  })
  await delay()
  isLoading.value = true
  fragments.splice(0, fragments.length)
  messages.splice(0, fragments.length)
  renderKey.value += 1
  await delay()
  isLoading.value = false
  restartIsDisabled.value = false
}
</script>
