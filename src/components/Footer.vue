<script lang="ts" setup>
import Busuanzi from './busuanzi.vue';
import line02 from '@/assets/line_02.png';

</script>
<template>
  <img :src="line02" alt="line" />
  <div class="footer card-container town-block">
    <p>"maimai DX"及舞萌DX图标素材属于舞萌DX</p>
    <p>（世嘉互动有限公司），仅用于展示和非商业目的使用。</p>
    <br>
    <!-- <div class="grid">
      <p>工具作者</p><a href="https://im0o.top" target="_blank">0o酱</a>
      <p>开源地址</p><a href="https://github.com/jz0ojiang/go-maimai-player-counter" target="_blank">Github</a>
    </div>
    <div class="grid">
      <p>API 使用请联系</p><a href="mailto:hi@im0o.top">Email</a>
      <p>赞助通道</p><a href="javascript:alert('还没做这功能，欢迎直接联系作者投喂')">施工中</a>
    </div> -->
    <div class="grid">
      <p>交流群</p><a href="https://qm.qq.com/cgi-bin/qm/qr?k=6NbfbucxYkNLqFpLveEEJpdVeqLGz4Ni&jump_from=webapi&authKey=NZ525vWAGLayUqy71gHa2ApASx5yhqc2xamWCVLi7MsNSSQg4qBSQIIoluwcQuQV" target="_blank">836503107</a>
      <p>爱发电</p><a href="https://afdian.net/@jz0ojiang">投喂</a>
    </div>
    <Busuanzi />
    <RouterLink to="/about">关于本站</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 400px;
  max-width: 100%;
  margin: 2vh 0;
}
.town-block {
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
  width: 400px;
  max-width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  text-align: center;
  margin-bottom: 5vh;
  * {
    color: #333;
  }
  .grid {
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 3fr 2fr);
    gap: 5px;
  }
  p {
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
  a {
    color: #fa8e53;
    font-weight: 600;
    text-decoration: none;
  }
  a:hover {
    color: #f9a77c;
  }
}
</style>
