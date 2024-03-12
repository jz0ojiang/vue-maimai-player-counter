<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import ArcadeDetail from '@/components/ArcadeDetail.vue';
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
      <ArcadeDetail />
      <div class="mpc_back_btn">
        <img :src="btnBack" alt="" @click="handleBack" />
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  .header {
    width: 100%;
  }
  .footer {
    margin-top: 2vh;
  }
}
</style>