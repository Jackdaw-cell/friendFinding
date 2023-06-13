<template class="parent-container">
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <van-loading class="van-loading" v-if="!userList||userList.length<=0" size="95px" color="#0094ff" text-color="#0094ff">加载中...</van-loading>
    <user-card-list v-else-if="!userList||userList.length>0" :user-list="userList" :pageType="pageType"></user-card-list>
  <van-empty v-else="teamList.length==null" description="数据为空" class="center-in-center"/>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import myAxios from "../plugins/myAxios.js";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";
import {match, recommand} from "../api/userPage";

const isMatchMode = ref<boolean>(false);

const userList = ref([]);
const loading = ref(true);
const userListData=ref([])
const pageType = ref(-1)
/**
 * 加载数据
 */
const loadData = async () => {
  loading.value = true;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    userList.value=[]
    pageType.value = 1
    userListData.value =await match(1,10)
  } else {
    userList.value=[]
    // 普通模式，直接分页查询用户
    pageType.value = 2
    userListData.value =await recommand(10,1)
  }
  // if (userListData.value) {
  //   userListData.value.forEach((user: UserType) => {
  //     if (user.tags) {
  //       user.tags = JSON.parse(user.tags);
  //     }
  //   })
  //   userList.value = userListData.value;
  // }
  userList.value = userListData.value;

  loading.value = false;
}

watchEffect(() => {
  loadData();
})

</script>

<style scoped>
.parent-container {
  position: relative;
  width: 100%; /* 设置父容器的宽度 */
  height: 100vh; /* 设置父容器的高度 */
}
.van-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* 设置组件的样式 */
}
</style>
