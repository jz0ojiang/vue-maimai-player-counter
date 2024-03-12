<script setup lang="ts">
import btnSubmit from "@/assets/btn_submit.png";

import axios from "axios";
import { watch, ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
// import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import VueTurnstile from 'vue-turnstile';

const route = useRouter();

const message = useMessage();

const provinces = ref([] as any[]);
const cities = ref([] as any[]);
const arcades = ref([] as any[]);

const selectProvince = ref("请选择省份");
const selectCity = ref("请选择城市");
const selectArcade = ref("请选择机厅");

const currentToken = ref("");
const currentCount = ref(0);
const oldCount = ref(0);

const handleSubmit = () => {
  if (selectProvince.value == "请选择省份") {
    message.warning("请选择省份");
    return;
  }
  if (selectCity.value == "请选择城市") {
    message.warning("请选择城市");
    return;
  }
  if (selectArcade.value == "请选择机厅") {
    message.warning("请选择机厅");
    return;
  }
  if (currentCount.value == oldCount.value) {
    message.warning("人数未发生变化");
    return;
  }
  if (currentToken.value == "") {
    message.warning("请完成人机验证");
    return;
  }
  // json body
//   {
//     "arcade_id": 1001,
//     "count": 0,
//     "type": 2,
//     "token": "test" 
// }
  axios
    .post("https://mpc.im0o.cn/logCount", {
      arcade_id: selectArcade.value,
      count: currentCount.value,
      type: 1,
      token: currentToken.value,
    }).then((res) => {
      if (res.data.code == 0) {
        message.success("提交成功");
        route.back();
      } else {
        message.error("提交失败");
      }
    });
};

const getCityList = () => {
  if (selectProvince.value == "请选择省份") {
    return;
  }
  axios
    .get(`https://mpc.im0o.cn/getCityList/${selectProvince.value}`)
    .then((res) => {
      for (const item of res.data.data) {
        cities.value.push({
          label: item.name,
          value: item.code,
        });
      }
    });
};

const getArcadeList = () => {
  if (selectCity.value == "请选择城市") {
    return;
  }
  axios
    .get(`https://mpc.im0o.cn/getArcadeList/city/${selectCity.value}`)
    .then((res) => {
      for (const item of res.data.data) {
        arcades.value.push({
          label: item.arcade_name,
          value: item.arcade_id,
        });
      }
    });
};

const getPlayerCount = () => {
  if (selectArcade.value == "请选择机厅") {
    return;
  }
  axios
    .get(`https://mpc.im0o.cn/getCount/${selectArcade.value}`)
    .then((res) => {
      currentCount.value = res.data.data[0].count;
      oldCount.value = res.data.data[0].count;
    });
};

const handleCaptcha = (token: string) => {
  currentToken.value = token;
};

onMounted(async () => {
  const { data } = await axios.get("https://mpc.im0o.cn/getProvinceList");
  for (const item of data.data) {
    provinces.value.push({
      label: item.name,
      value: item.code,
    });
  }
});

watch(selectProvince, () => {
  cities.value = [];
  arcades.value = [];
  selectCity.value = "请选择城市";
  selectArcade.value = "请选择机厅";
  getCityList();
});

watch(selectCity, () => {
  arcades.value = [];
  selectArcade.value = "请选择机厅";
  getArcadeList();
});

watch(selectArcade, () => {
  currentCount.value = 0;
  getPlayerCount();
});

const lock = ref(false);


const presetquery = async () => {
  console.log(route.currentRoute.value.query)
  // query 同时包含 arcade_id city_code 和 province_code
  if (route.currentRoute.value.query.arcade_id && route.currentRoute.value.query.city_code && route.currentRoute.value.query.province_code) {
    let province_code = route.currentRoute.value.query.province_code as string;
    let city_code = route.currentRoute.value.query.city_code as string;
    let arcade_id = route.currentRoute.value.query.arcade_id as string;
    {
      let { data } = await axios.get("https://mpc.im0o.cn/getProvinceList");
      if (data.code == 0) {
        let province = data.data.find((item: any) => item.code == province_code);
        selectProvince.value = province.code;
      }
    }
    {
      let { data } = await axios.get("https://mpc.im0o.cn/getCityList/" + province_code);
      if (data.code == 0) {
        let city = data.data.find((item: any) => item.code == city_code);
        selectCity.value = city.code;
      }
    }
    {
      let { data } = await axios.get("https://mpc.im0o.cn/getArcadeList/city/" + city_code);
      if (data.code == 0) {
        let arcade = data.data.find((item: any) => item.arcade_id == arcade_id);
        selectArcade.value = arcade.arcade_id;
      }
    }
    lock.value = true;
  }
}

presetquery()

</script>

<template>
  <div class="card-container town_block">
    <h3>请选择区域</h3>
    <div class="content">
      <div class="pc item">
        <p>省份</p>
        <n-select
          v-model:value="selectProvince"
          :options="provinces"
          size="small"
          :disabled="lock"
        />
      </div>
      <div class="pc item">
        <p>城市</p>
        <n-select
          v-model:value="selectCity"
          :options="cities"
          size="small"
          :disabled="selectProvince == '请选择省份' || lock"
        />
      </div>
      <div class="pc item">
        <p>机厅</p>
        <n-select
          v-model:value="selectArcade"
          :options="arcades"
          size="small"
          :disabled="selectCity == '请选择城市' || lock"
          
        />
      </div>
      <div class="pc item">
        <p>人数</p>
        <n-input-number
          v-model:value="currentCount"
          style="width: 100%"
          :disabled="selectArcade == '请选择机厅'"
          :min="0"
          :max="100"
        >
        </n-input-number>
      </div>

      <div class="mobile item">
        <var-select
          variant="outlined"
          placeholder="请选择省份"
          v-model="selectProvince"
          size="small"
          :disabled="lock"
        >
          <var-option
            v-for="province in provinces"
            :label="province.label"
            :value="province.value"
          />
        </var-select>
      </div>
      <div class="mobile item">
        <var-select
          variant="outlined"
          placeholder="请选择城市"
          v-model="selectCity"
          size="small"
          :disabled="selectProvince == '请选择省份' || lock"
        >
          <var-option
            v-for="city in cities"
            :label="city.label"
            :value="city.value"
          />
        </var-select>
      </div>
      <div class="mobile item">
        <var-select
          variant="outlined"
          placeholder="请选择机厅"
          v-model="selectArcade"
          size="small"
          :disabled="selectCity == '请选择城市' || lock"
        >
          <var-option
            v-for="arcade in arcades"
            :label="arcade.label"
            :value="arcade.value"
          />
        </var-select>
      </div>
      <div class="mobile-flex item">
        <p>人数</p>
        <var-counter :min="0" :max="100" v-model="currentCount" :disabled="selectArcade == '请选择机厅'" />
      </div>
      <div class="item captcha">
        <!-- <VueHcaptcha sitekey="acb5012b-2eb7-4993-955e-e111ec98e19c" @verify="handleCaptcha" /> -->
        <vue-turnstile site-key="0x4AAAAAAAPONBt1HMuGLBvw" v-model="currentToken" />
      </div>
      <div class="item">
        <div class="btn">
          <div @click="handleSubmit">
            <img :src="btnSubmit" alt="" draggable="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@media screen and (max-width: 726px) {
  .pc {
    display: none !important;
  }
  .mobile {
    display: block !important;
  }
  .mobile-flex {
    display: flex !important;
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile {
    display: none;
  }
  .mobile-flex {
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
    .captcha {
      width: 100%;
      display: flex;
      justify-content: center !important;
      align-items: center;
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
