<template>
  <div>
    <van-sticky v-for="msg in historyMessage">
      <van-tag round type="primary">{{msg.message}}</van-tag>
    </van-sticky>
    <van-action-bar>
      <van-search
          style="width: 100%"
          left-icon="none"
          v-model="sayValue"
          show-action
      >
        <template #action>
          <div @click="onClickButton()">发送</div>
        </template>
      </van-search>
    </van-action-bar>
  </div>

</template>

<script setup lang="ts">
import {onMounted, onUpdated, ref} from "vue";
import { useRouter } from 'vue-router';
const router=useRouter()
let sayValue = ref('')
let superData = defineProps({
  userId:{
    type:String,
    default:"-1"
  },
  ws:{
    type:Object,
  },
  history:{
    type:Object,
  }
})
onMounted(()=>{
  // console.log("play:",superData.ws)
})
onUpdated(()=>{
  console.log(superData.history)
})


const historyMessage=ref([])
// const onClickButton=()=>{
//   let json={"toName":superData.userId,"message":sayValue.value}
//   superData.ws.send(JSON.stringify(json))
//   historyMessage.value.push(json)
//   sayValue.value=''
// }
// const ws=new WebSocket("ws://localhost:8080/api/chat")
// ws.onopen=(val)=>{
//   console.log("连接建立",val)
// }
// ws.onmessage=(str)=>{
//   console.log("连接建立",str)
// }
// ws.onclose=()=>{
//   console.log("连接关闭")
// }

// const close=()=>{
//   ws.close()
// }

</script>

<style scoped>

</style>
