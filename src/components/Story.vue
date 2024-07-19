<template>
  <div id="story" class="mx-auto max-w-3xl">
    <div id="controls" class="text-center my-8">
      <Restart
        :isStarted="isStarted"
        :isDisabled="isRestartDisabled"
        @restart="restart"
      />
    </div>
    <div :key="renderKey" id="content" v-if="isStarted">
      <Introduction />
      <Genre @selectGenre="beginStory" />
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Introduction from './Introduction.vue'
import Genre from './genre.vue'
import Fragment from './Fragment.vue'
import LoadingFragment from './LoadingFragment.vue'
import Restart from './Restart.vue'
import { delay, throttle, prompt } from '../utils.ts'
import type { CoreMessage } from 'ai'
import type { FragmentType } from '../types.ts'
import { fall } from '../anime.ts'

const isStarted: boolean = ref(false)
const isLoadingFragment: boolean = ref(false)
const isRestartDisabled: boolean = ref(false)
const fragments: FragmentType[] = reactive([])
const messages: CoreMessage[] = []
const renderKey: number = ref(0)

async function beginStory(genre: string) {
  isRestartDisabled.value = true
  messages.push({
    role: 'system',
    content: prompt.replace('[genre]', genre),
  })

  await apiRequest()
  isRestartDisabled.value = false
}

async function addFragment(choice: string) {
  isRestartDisabled.value = true
  messages.push({
    role: 'user',
    content: choice,
  })

  await apiRequest()
  isRestartDisabled.value = true
}

async function retry() {
  isRestartDisabled.value = true
  await apiRequest()
  isRestartDisabled.value = false
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
  isRestartDisabled.value = true
  if (isStarted.value) {
    fall(['#content'])
    await delay()
    fragments.splice(0, fragments.length)
    messages.splice(0, fragments.length)
  }
  renderKey.value += 1
  isStarted.value = true
  isRestartDisabled.value = false
}
</script>
