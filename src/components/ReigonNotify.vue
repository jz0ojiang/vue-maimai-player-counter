<template>
    <var-snackbar v-model:show="show" position="bottom" :vertical="true">
        您上次查询的是 {{ provinceName }} {{ cityName }} 的机厅，是否直接跳转？
        <template #action>
        <var-button type="primary" size="small" @click="handleToCity">跳转</var-button>
        </template>
    </var-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const route = useRouter()
const province = localStorage.getItem('province')
const city = localStorage.getItem('city')
const show = ref(false)
const provinceName = ref("")
const cityName = ref("")

const handleToCity = () => {
    route.push({
    path: '/city/' + city
  })
}

onMounted(async () => {
    if (province && city) {
        {
            let { data } = await axios.get("https://mpc.im0o.cn/getProvinceList");
            provinceName.value = data.data.find((item: any) => item.code == province).name
        }
        {
            let { data } = await axios.get("https://mpc.im0o.cn/getCity/" + city);
            cityName.value = data.data.name
        }
        show.value = true
    }
})
</script>