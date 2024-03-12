<script setup lang="ts">
import titleError from "@/assets/title_error.png";
import titleMpc from "@/assets/title_mpc.png";
import chara01 from "@/assets/chara_01.png";

import axios from "axios";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useLoadingBar } from "naive-ui";

const loadingbar = useLoadingBar();

const route = useRouter();

const arcade = ref({} as any);

const countLogs = ref([] as any);

var error = ref(false);
var loading = ref(true);

onBeforeMount(async () => {
  loadingbar.start();
  try {
    let { data } = await axios.get(
      "https://mpc.im0o.cn/getArcade/" + route.currentRoute.value.params.arcade
    );
    arcade.value = data.data;
    {
      let { data } = await axios.get(
        "https://mpc.im0o.cn/getCount/" +
          route.currentRoute.value.params.arcade
      );
      countLogs.value = data.data;
    }
    loading.value = false;
    loadingbar.finish();
  } catch (err) {
    error.value = true;
    loading.value = false;
    loadingbar.error();
  }
});

const handleToUpdate = () => {
  route.push({
    path: "/update",
    query: {
      arcade_id: arcade.value.arcade_id,
      province_code: arcade.value.province.code,
      city_code: arcade.value.city.code,
    },
  });
};

const getType = (type: number) => {
  switch (type) {
    case 0:
      return "系统";
    case 1:
      return "网页";
    case 2:
      return "Bot";
    default:
      return "未知"
  }
}
// 输出 MM月dd日 HH:mm
// 分钟补0
const getTime = (time: string) => {
  let date = new Date(time);
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
}


</script>

<template>
  <div v-if="!loading">
    <div class="title">
      <img :src="titleError" draggable="false" v-cloak v-if="error" />
      <img :src="titleMpc" draggable="false" v-cloak v-else />
    </div>
    <div class="card-container town_block error-container" v-if="error">
      <h2>出现了错误</h2>
      <div class="content error-content">
        <img :src="chara01" alt="" draggable="false" />
        <p>获取机厅数据失败</p>
      </div>
    </div>
    <div class="card-container town_block" v-else>
      <h2>{{ arcade.arcade_name }}</h2>
      <div class="content">
        <div class="item">
          <p>当前人数</p>
          <p>{{ countLogs[0].count }}</p>
        </div>
        <div class="item">
          <p>机台数量</p>
          <p>{{ arcade.machine_count }}</p>
        </div>
        <div class="item">
          <n-thing>
            <template #header>
              <p>机厅地址</p>
            </template>
            {{ arcade.address }}
          </n-thing>
        </div>
        <div style="padding: 10px">
          <n-thing>
            <template #header>
              <p>更新日志</p>
            </template>
            <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>人数</th>
                <th>更新时间</th>
                <th>更新来源</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="countlog in countLogs">
                <td>{{ countlog.count == -1 ? "获取失败" : countlog.count }}</td>
                <td>{{ getTime(countlog.update_timestamp) }}</td>
                <td>{{ getType(countlog.type) }}</td>
              </tr>
            </tbody>
          </n-table>
          </n-thing>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  box-shadow: 0 0 0 2px #ff6a6a, 0 0 0 6px #fff, 1px 8px 8px rgba(0, 0, 0, 0.2),
    0 12px rgba(0, 0, 0, 0.2) !important;
}

.title {
  height: 45px;
  margin-bottom: 30px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}

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
  padding: 10px 20px 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .error-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    cursor: default;
    img {
      width: 100px;
      object-fit: contain;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      min-width: 100px;
      line-height: 16px;
      padding: 0;
      margin: 0;
      align-self: center;
    }
  }
  .content {
    margin-top: 20px;
    width: 100%;
    .item:last-child {
      margin-top: 20px;
    }
    p {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      min-width: 2em;
      line-height: 16px;
      padding: 0;
      margin: 0;
      align-self: center;
    }
    .item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;

      .btn {
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: default;
        img {
          cursor: pointer;
          width: 120px;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
}
</style>
