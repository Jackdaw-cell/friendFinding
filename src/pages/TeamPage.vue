<template class="parent-container">
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private" />
    </van-tabs>
    <div style="margin-bottom: 16px" />
      <van-loading class="van-loading"  v-if="teamList?.length < 1" size="95px" color="#0094ff" text-color="#0094ff">加载中...</van-loading>
      <team-card-list v-else-if="teamList?.length > 0" :teamList="teamList" />
      <van-empty v-else="teamList.length==null" description="数据为空"/>
  </div>
  <van-button class="add-button" type="primary" icon="plus" @click="toAddTeam" />
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const active = ref('public')
const router = useRouter();
const searchText = ref('');

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  // 查公开
  if (name === 'public') {
    listTeam(searchText.value, 0);
  } else {
    // 查加密
    listTeam(searchText.value, 2);
  }
}

// 跳转到创建队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    if (res.data.length == 0){
      teamList.value = null;
    }else {
      teamList.value = res.data;
    }
  } else {
    Toast.fail('加载队伍失败，请刷新重试');
  }
}

// 页面加载时只触发一次
onMounted( () => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
};

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
