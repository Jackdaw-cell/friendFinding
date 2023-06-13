<template>
  <van-loading class="van-loading" v-if="!userList||userList.length<=0" size="95px" color="#0094ff" text-color="#0094ff">加载中...</van-loading>
  <user-card-list v-else-if="!userList||userList.length>0" :user-list="userList" :pageType="pageType" :tags="tags"></user-card-list>
  <van-empty v-else="teamList.length==null" description="数据为空" class="center-in-center"/>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Toast } from 'vant';
import { useRoute } from "vue-router";
import UserCardList from "../components/UserCardList.vue";
import {tag} from "../api/userPage";

import myAxios from '../plugins/myAxios.js'
const route=useRoute()
import qs from 'qs'

const { tags } = route.query;

const userList = ref([]);

const pageType = ref(3)

const num=ref(10)

onMounted(async ()=>{
  const userListData = await tag(1,tags,num.value).then(res=>{
    // 可选链操作符，因为data可能为空
    if (res?.data){
      userList.value=res?.data
    }else {
      userList.value=[]
      return;
    }
    // tags作为json数组字符串，传到前端不是数组类型，因此要进行json序列化
    userList.value.forEach(user=>{
      if (user.tags){
        user.tags=JSON.parse(user.tags)
      }
    })
  }).catch(res=>{
    Toast.fail('请求失败')
    userList.value=[]
  })
//   Todo:将请求的值赋值操作
})


</script>

<style scoped>

</style>
