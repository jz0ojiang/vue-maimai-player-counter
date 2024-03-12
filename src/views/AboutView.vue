<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
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
      <div class="card-container town_block">
        <h3>关于本站</h3>
        <p>这是内容</p>
      </div>
    </div>
    <div class="mpc_back_btn">
      <img :src="btnBack" alt="" @click="handleBack" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.town_block {
  background: #fff url(/back_town_01.png) bottom no-repeat;
  background-size: 485px;
  box-shadow: 1px 3px 0px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
}
.card-container {
  box-shadow: 0 0 0 2px #2e94f4, 0 0 0 6px #fff, 1px 8px 8px rgba(0, 0, 0, 0.2),
    0 12px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 10px;
  min-width: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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