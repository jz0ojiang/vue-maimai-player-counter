<template>
  <div class="busuanzi_container">
    <div id="busuanzi_container_site_pv">
      站点访问量 <span id="busuanzi_value_site_pv">{{ stats.site_pv }}</span>
    </div>
    <div id="busuanzi_container_page_pv">
      页面访问量 <span id="busuanzi_value_page_pv">{{ stats.page_pv }}</span>
    </div>
  </div>
  <div id="busuanzi_container_site_uv">
    访客数量 <span id="busuanzi_value_site_uv">{{ stats.site_uv }}</span>
  </div>
</template>

<style lang="scss" scoped>
.busuanzi_container {
    width: 100%;
    display: grid;
    grid-template: "site_pv page_pv";
    gap: 10px;
    font-size: 14px;
  }
  #busuanzi_container_site_pv,
  #busuanzi_container_page_pv,
  #busuanzi_container_site_uv {
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      text-align: left;
      gap: 5px;
  }
  #busuanzi_value_site_pv,
  #busuanzi_value_page_pv,
  #busuanzi_value_site_uv {
      color: #fa8e53;
      font-weight: 500;
      text-decoration: none;
  }
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const stats = ref({
  site_pv: 0,
  page_pv: 0,
  site_uv: 0,
});

const fetchStats = () => {
  const callbackName = `BusuanziCallback_${Math.floor(
    1099511627776 * Math.random()
  )}`;
  (window as any)[callbackName] = (data: any) => {
    stats.value.site_pv = data.site_pv;
    stats.value.page_pv = data.page_pv;
    stats.value.site_uv = data.site_uv;
    document.head.removeChild(scriptTag);
  };

  const scriptTag = document.createElement("script");
  scriptTag.type = "text/javascript";
  scriptTag.defer = true;
  scriptTag.src = `//busuanzi.ibruce.info/busuanzi?jsonpCallback=${callbackName}`;
  scriptTag.referrerPolicy = "no-referrer-when-downgrade";
  document.head.appendChild(scriptTag);
};

onMounted(() => {
  fetchStats();
});
</script>
