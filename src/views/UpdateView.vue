<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import UpdateForm from '@/components/UpdateForm.vue';
import titleMpc from "@/assets/title_mpc_update.png";
import btnBack from "@/assets/btn_back.png";
import { useRouter } from "vue-router";
const route = useRouter();

const handleBack = () => {
  route.back();
};
</script>

<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <div class="main">
    <div class="title">
      <img :src="titleMpc" draggable="false" />
    </div>
      <UpdateForm />
    </div>
    <div class="mpc_back_btn">
      <img :src="btnBack" alt="" @click="handleBack" />
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
  .title {
    height: 45px;
    margin-bottom: 30px;
    padding: 1px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
  .mpc_back_btn {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 100px;
    object-fit: contain;
  }
}
}
</style>