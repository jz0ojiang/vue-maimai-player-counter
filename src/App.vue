<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider } from 'naive-ui'

const themeOverrides = {
  "common": {
    "primaryColor": "#51bcf3FF",
    "primaryColorHover": "#6ec3f8FF",
    "primaryColorPressed": "#3e92caFF",
    "primaryColorSuppl": "#2Abcf3FF"
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-loading-bar-provider>
        <RouterView />
      </n-loading-bar-provider>
    </n-message-provider>
    </n-config-provider>
</template>

<style>
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
</style>

