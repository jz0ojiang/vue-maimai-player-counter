<script setup lang="ts">
import titleError from "@/assets/title_error.png";
import titleMpc from "@/assets/title_mpc.png";
import chara01 from "@/assets/chara_01.png";
import btnBack from "@/assets/btn_back.png";

import axios, { AxiosError } from "axios";
import { ref, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { useLoadingBar } from "naive-ui";

const loadingbar = useLoadingBar();

const route = useRouter();

const city = ref({} as any);
const province = ref({} as any);
const arcades = ref([] as any);
const showArcades = ref([] as any);
const searchArcades = ref([] as any);
const currentPage = ref(1);
const pageCount = ref(1);
const counts = ref({} as any);
const total = ref(0);

var error = ref(false);
var loading = ref(true);

const getCount = (arcade_id: number) => {
  return counts.value[arcade_id] || 0;
};

onBeforeMount(async () => {
  loadingbar.start();
  try {
    // 获取城市数据
    let res = await axios.get(
      "https://mpc.im0o.cn/getCity/" + route.currentRoute.value.params.city
    );

    if (res.status === 404) {
      console.error("API请求失败，资源未找到 (404)");
      error.value = true;
      loading.value = false;
      loadingbar.error();
      return;
    }

    if (res.data.code !== 0) {
      error.value = true;
      loading.value = false;
      loadingbar.error();
      return;
    }

    // 获取省市信息
    city.value = res.data.data;
    {
      let { data } = await axios.get("https://mpc.im0o.cn/getProvinceList");
      province.value = data.data.find(
        (item: any) => item.code === city.value.province_code
      );
    }

    // 获取机厅数据
    {
      let { data } = await axios.get(
        "https://mpc.im0o.cn/getArcadeList/city/" + city.value.code
      );
      arcades.value = data.data;
      if (arcades.value.length > 5) {
        showArcades.value = arcades.value.slice(0, 5);
        pageCount.value = Math.ceil(arcades.value.length / 5);
      } else {
        showArcades.value = arcades.value;
      }
    }
    {
      let { data } = await axios.get(
        "https://mpc.im0o.cn/getCountByCity/" + city.value.code
      );
      counts.value = data.data;
      total.value = Object.values(data.data).reduce<number>(
        (accumulator, currentValue) => accumulator + (currentValue as number),
        0
      );
    }

    loading.value = false;
    loadingbar.finish();
  } catch (err) {
    if (
      ((err as AxiosError).response?.data as any).message == "no arcade found"
    ) {
      error.value = false;
      loading.value = false;
      loadingbar.error();
      return;
    }
    error.value = true;
    loading.value = false;
    loadingbar.error();
  }
});
const handleBack = () => {
  route.back();
};
const handleToUpdate = (arcade_id: number) => {
  let arcade = arcades.value.find((item: any) => item.arcade_id === arcade_id);
  route.push({
    path: "/update",
    query: {
      arcade_id: arcade.arcade_id,
      province_code: arcade.province.code,
      city_code: arcade.city.code,
    },
  });
};

const handleToArcade = (arcade_id: number) => {
  route.push({
    path: "/arcade/" + arcade_id,
  });
};

const searchText = ref("");

const handleSearch = () => {
  if (searchText.value == "") {
    searchArcades.value = [];
    showArcades.value = arcades.value.slice(0, 5);
    pageCount.value = Math.ceil(arcades.value.length / 5);
    return;
  }
  searchArcades.value = arcades.value.filter((arcade: any) => {
    return arcade.arcade_name.includes(searchText.value);
  });
  if (searchArcades.value.length > 5) {
    showArcades.value = searchArcades.value.slice(0, 5);
    pageCount.value = Math.ceil(searchArcades.value.length / 5);
  } else {
    showArcades.value = searchArcades.value;
  }
  currentPage.value = 1;
};

const handlePageChange = () => {
  if (searchArcades.value.length > 0) {
    showArcades.value = searchArcades.value.slice(
      (currentPage.value - 1) * 5,
      currentPage.value * 5
    );
    return;
  }
  showArcades.value = arcades.value.slice(
    (currentPage.value - 1) * 5,
    currentPage.value * 5
  );
};

watch(currentPage, handlePageChange);
</script>

<template>
  <div v-if="!loading">
    <div class="title">
      <img :src="titleError" draggable="false" v-cloak v-if="error" />
      <img :src="titleMpc" draggable="false" v-cloak v-else />
    </div>
    <div
      class="mai-card card-container town_block error-container"
      v-if="error"
    >
      <h3>出现了错误</h3>
      <div class="content error-content">
        <img :src="chara01" alt="" draggable="false" />
        <p>获取城市数据失败</p>
      </div>
    </div>
    <div class="mai-card card-container town_block" v-else>
      <h3>{{ province.name }} - {{ city.name }}</h3>
      <p>当前城市共有 {{ total }} 人在出勤</p>
      <span>点击机厅名称即可查看详情</span>
      <div class="content">
        <n-flex justify="center" v-if="arcades.length >= 5" class="search-box">
          <n-input
            v-model:value="searchText"
            placeholder="搜索机厅"
            class="search-input"
            @input="handleSearch"
          ></n-input>
        </n-flex>
        <n-table
          :bordered="false"
          :single-line="false"
          v-if="arcades.length > 0"
        >
          <thead>
            <tr>
              <th>机厅名称</th>
              <th>机台数量</th>
              <th>人数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="arcade in showArcades">
              <td @click="handleToArcade(arcade.arcade_id)">
                {{ arcade.arcade_name }}
              </td>
              <td>{{ arcade.machine_count }}</td>
              <td>
                {{
                  getCount(arcade.arcade_id) == -1
                    ? "获取失败"
                    : getCount(arcade.arcade_id)
                }}
              </td>
              <td>
                <n-button
                  strong
                  secondary
                  type="primary"
                  size="small"
                  @click="handleToUpdate(arcade.arcade_id)"
                >
                  更新
                </n-button>
              </td>
            </tr>
          </tbody>
        </n-table>
        <div v-else class="error-content">
          <img :src="chara01" alt="" draggable="false" />
          <p>当前城市没有舞萌</p>
        </div>
        <n-flex justify="center" class="pagination-box">
          <h2 v-if="searchText != '' && searchArcades.length == 0">暂无更多数据</h2>
          <n-pagination
            v-if="(arcades.length >= 5 && searchArcades.length == 0) || searchArcades.length >= 5"
            v-model:page="currentPage"
            :page-count="pageCount"
          />
        </n-flex>
      </div>
    </div>
  </div>
  <div class="mpc_back_btn">
    <img :src="btnBack" alt="" @click="handleBack" />
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
.title {
  height: 45px;
  margin-bottom: 30px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}

.search-box {
  margin-bottom: 20px;
  .search-input {
    width: 70%;
    padding: 2px;
  }
}

.pagination-box {
  margin-top: 20px;
}

.card-container {
  span {
    font-size: 14px;
    color: #999;
  }
  .mobile {
    display: none;
  }
  .pc {
    display: flex;
  }
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
    .item {
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
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

@media screen and (max-width: 726px) {
  .pc {
    display: none !important;
  }
  .mobile {
    display: block !important;
  }
}
</style>
