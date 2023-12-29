<script setup lang="ts">
import btnSearchSubmit from '@/assets/btn_search_submit.png'
import titleMpc from '@/assets/title_mpc.png'
import mpcUpdateBtn from '@/assets/mpc_update_btn.png'

import axios from 'axios'
import { watch, ref, onMounted } from 'vue';
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router';

const route = useRouter()

const message = useMessage()

const provinces = ref([] as any[])
const cities = ref([] as any[])

const selectProvince = ref('请选择省份')
const selectCity = ref('请选择城市')

const handleSearch = () => {
  if (selectProvince.value == '请选择省份') {
    message.warning("请选择省份")
    return
  }
  if (selectCity.value == '请选择城市') {
    message.warning('请选择城市')
    return
  }
  route.push({
    path: '/city/' + selectCity.value
  })
}

const getCityList = () => {
  axios.get(`https://mpc.im0o.cn/getCityList/${selectProvince.value}`).then(res => {
    for (const item of res.data.data) {
      cities.value.push({
        label: item.name,
        value: item.code
      })
    }
  })
}

onMounted(async () => {
  const { data } = await axios.get('https://mpc.im0o.cn/getProvinceList')
  for (const item of data.data) {
    provinces.value.push({
      label: item.name,
      value: item.code
    })
  }
})

watch(selectProvince, () => {
  selectCity.value = '请选择城市'
  cities.value = []
  getCityList()
})

const handleToUpdate = () => {
  route.push('/update')
}

</script>

<template>
  <div class="title">
    <img :src="titleMpc" draggable="false" />
  </div>
  <div class="card-container town_block">
    <h3>请选择区域</h3>
    <div class="content">
      <div class="pc item">
        <p>省份</p>
        <n-select v-model:value="selectProvince" :options="provinces" size="small" />
      </div>
      <div class="pc item">
        <p>城市</p>
        <n-select v-model:value="selectCity" :options="cities" size="small" :disabled="selectProvince == '请选择省份'" />
      </div>

      <div class="mobile item">
        <var-select variant="outlined" placeholder="请选择省份" v-model="selectProvince" size="small">
          <var-option v-for="province in provinces" :label="province.label" :value="province.value" />
        </var-select>
      </div>
      <div class="mobile item">
        <var-select variant="outlined" placeholder="请选择城市" v-model="selectCity" size="small" :disabled="selectProvince == '请选择省份'">
          <var-option v-for="city in cities" :label="city.label" :value="city.value" />
        </var-select>
      </div>
      <div class="item">
        <div class="btn">
          <div @click="handleSearch">
            <img :src="btnSearchSubmit" alt="" draggable="false">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mpc_update_btn">
    <img :src="mpcUpdateBtn" alt="" @click="handleToUpdate">
  </div>
</template>

<style lang="scss" scoped>
.mpc_update_btn {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 300px;
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

@media screen and (max-width: 726px) {
  .pc {
    display: none !important;
  }
  .mobile {
    display: block !important;
  }
}

.town_block {
	background: #fff url(/back_town_01.png) bottom no-repeat;
	background-size: 485px;
	box-shadow: 1px 3px 0px rgba(0, 0, 0, 0.4);
	border-radius: 5px;
}
.card-container {
  box-shadow: 0 0 0 2px #2e94f4, 0 0 0 6px #fff, 1px 8px 8px rgba(0, 0, 0, 0.2), 0 12px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 10px;
  min-width: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile {
    display: none;
  }
  .pc {
    display: flex;
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
</style>
