<template>
  <button
    type="button"
    class="ms-4 border hover:text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:hover:text-white"
    :class="[
      isApiKeySaved
        ? 'text-green-400 border-green-400 hover:bg-green-500 focus:ring-green-300 dark:border-green-300 dark:text-green-300 dark:focus:ring-green-900 dark:hover:bg-green-400'
        : 'text-yellow-400 border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:focus:ring-yellow-900 dark:hover:bg-yellow-400',
    ]"
    @click="showModal"
  >
    <SettingsIcon />
    <span class="sr-only">Settings</span>
  </button>
  <div
    v-if="isModalVisible"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    @click.self="hideModal"
  >
    <div class="relative p-4 w-full max-w-md">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Configura la API key
          </h3>
          <button
            type="button"
            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="hideModal"
          >
            <CloseIcon />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5">
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4">
            Por defecto se usa una API key gratuita que desafortunadamente está
            sometida a limitaciones.
          </p>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4">
            Pero puedes añadir la tuya para evitar esas limitaciones.
          </p>
          <form class="space-y-4" @submit="onSubmit">
            <ul
              class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
              >
                <div class="flex items-center ps-3">
                  <input
                    v-model="providerForm"
                    id="openai"
                    type="radio"
                    value="openai"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="openai"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Openai API
                  </label>
                </div>
              </li>

              <li class="w-full dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    v-model="providerForm"
                    id="groq"
                    type="radio"
                    value="groq"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="groq"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Groq API
                  </label>
                </div>
              </li>
            </ul>

            <div>
              <label
                for="api-key"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >API key</label
              >
              <input
                type="password"
                name="api-key"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                v-model="apiKeyForm"
              />
              <p
                v-if="isApiKeySaved"
                class="mt-2 text-sm text-green-600 dark:text-green-500"
              >
                Ya hay una API key guardada
              </p>
            </div>

            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SettingsIcon from '../icons/SettingsIcon.vue'
import CloseIcon from '../icons/CloseIcon.vue'
import { apiKey, provider } from '../apiKeyStore.ts'
import { useStore } from '@nanostores/vue'
import type { Provider } from '../types.ts'

const isModalVisible: boolean = ref(false)
const apiKeyForm: string = ref(useStore(apiKey).value)
const providerForm: Provider = ref(useStore(provider).value)
const isApiKeySaved: boolean = ref(false)

// Ensure event listeners are cleaned up
onMounted(() => {
  if (isModalVisible.value) {
    addKeydownListener()
  }
})

onUnmounted(() => {
  removeKeydownListener()
})

function showModal() {
  isModalVisible.value = true
  addKeydownListener()
}

function hideModal() {
  isModalVisible.value = false
  removeKeydownListener()
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    hideModal()
  }
}

function addKeydownListener() {
  window.addEventListener('keydown', handleKeyDown)
}

function removeKeydownListener() {
  window.removeEventListener('keydown', handleKeyDown)
}

function onSubmit(event: Event) {
  event.preventDefault()
  apiKey.set(apiKeyForm.value)
  provider.set(providerForm.value)
  hideModal()
  isApiKeySaved.value = apiKeyForm.value
}
</script>
