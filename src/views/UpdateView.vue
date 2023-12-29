<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import UpdateForm from '@/components/UpdateForm.vue';
</script>

<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <UpdateForm />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: overlay;
  .header {
    width: 100%;
  }
  .footer {
    margin-top: 2vh;
  }
}
</style>