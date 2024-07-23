<template>
  <div id="story" class="mx-auto max-w-3xl">
    <div id="controls" class="text-center my-8">
      <RestartButton
        :isStarted="isStarted"
        :isDisabled="isRestartDisabled"
        @restart="restart"
      />
    </div>
    <div :key="renderKey" id="content" v-if="isStarted">
      <StoryIntro />
      <GenreSelector @selectGenre="beginStory" />
      <ol
        id="storyline"
        class="relative border-s border-gray-200 dark:border-gray-700"
      >
        <StoryFragment
          v-for="(fragment, index) in fragments"
          :text="fragment.message"
          :id="index + 1"
          :choices="fragment.choices"
          :isError="fragment.isError"
          @addStoryFragment="addStoryFragment"
          @retryStoryFragment="retryStoryFragment"
        />
      </ol>
      <LoadingStoryFragment v-if="isLoadingFragment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import StoryIntro from './StoryIntro.vue'
import GenreSelector from './GenreSelector.vue'
import StoryFragment from './StoryFragment.vue'
import LoadingStoryFragment from './LoadingStoryFragment.vue'
import RestartButton from './RestartButton.vue'
import { delay, throttle, prompt, choicesError } from '../utils.ts'
import type { CoreMessage } from 'ai'
import type { FragmentType } from '../types.ts'
import { fall } from '../anime.ts'
import { DefaultError } from '../errors/DefaultError.ts'
import { TimeoutError } from '../errors/TimeoutError.ts'

const isStarted: boolean = ref(false)
const isLoadingFragment: boolean = ref(false)
const isRestartDisabled: boolean = ref(false)
const fragments: FragmentType[] = reactive([])
const messages: CoreMessage[] = []
const renderKey: number = ref(0)

const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
})

async function beginStory(genre: string) {
  isRestartDisabled.value = true
  messages.push({
    role: 'system',
    content: prompt.replace('[genre]', genre),
  })

  await apiRequest()
  isRestartDisabled.value = false
}

async function addStoryFragment(choice: string) {
  isRestartDisabled.value = true
  messages.push({
    role: 'user',
    content: choice,
  })

  await apiRequest()
  isRestartDisabled.value = true
}

async function retryStoryFragment() {
  isRestartDisabled.value = true
  await apiRequest()
  isRestartDisabled.value = false
}

async function apiRequest() {
  isLoadingFragment.value = true
  const startTime: number = Date.now()

  try {
    const result = await fetch('/api/story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
        uuid: props.uuid,
      }),
    })

    const elapsedTime: number = Date.now() - startTime
    if (elapsedTime < throttle) {
      await delay(throttle - elapsedTime)
    }

    let fragment: FragmentType

    if (result.status === 504) {
      const timeoutError = new TimeoutError()
      fragment = {
        message: timeoutError.message,
        isError: true,
        choices: choicesError,
      }
    } else {
      fragment = await result.json()
    }

    if (result.status === 200) {
      messages.push({
        role: 'assistant',
        content: fragment.message,
      })
    }

    fragments.push(fragment)
  } catch (error: unknown) {
    const defaultError = new DefaultError()
    fragments.push({
      message: defaultError.message,
      isError: true,
      choices: choicesError,
    })
  } finally {
    isLoadingFragment.value = false
  }
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
