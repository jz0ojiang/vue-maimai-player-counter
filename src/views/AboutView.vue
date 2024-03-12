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
      <div class="mai-card card-container town_block">
        <h3>关于本站</h3>
        <div class="center">
          <p>工具作者 <a target="_blank" href="https://im0o.top">0o酱</a> &nbsp; API 使用请联系 <a target="_blank" href="mailto:hi@im0o.top">Email</a></p>
          <p>前端开源 <a target="_blank" href="https://github.com/jz0ojiang/maimai-player-counter">Github - maimai-player-counter</a></p>
          <p>后端开源 <a target="_blank" href="https://github.com/jz0ojiang/go-maimai-player-counter">Github - go-maimai-player-counter</a></p>
        </div>
      </div>
    </div>
    <div class="mpc_back_btn">
      <img :src="btnBack" alt="" @click="handleBack" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: #fa8e53;
  font-weight: 600;
  text-decoration: none;
}
a:hover {
  color: #f9a77c;
}
.center {
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card-container {
  width: 400px;
}

@media screen and (max-width: 726px) {
  .card-container {
    width: 92vw;
    margin: 0 auto;
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