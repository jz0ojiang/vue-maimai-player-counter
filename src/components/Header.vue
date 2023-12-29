<script setup lang="ts">
import maimaidxLogo from '@/assets/maimaidx-logo.png'
</script>

<template>
  <div class="header">
    <div class="logo">
      <img :src="maimaidxLogo" draggable="false" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  min-height: clamp(100px, 10vh, 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .logo {
    height: 120px;
    padding: 20px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>