<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
<!--      <van-cell v-for="item in list" :key="item" :title="item" />-->
      <van-card
          v-for="user in list"
          :desc="user.profile"
          :title="user.username"
          :thumb="user.avatarUrl"
      >
        <template #title>
          <h2>{{user.username}}</h2>
        </template>
        <template #tags>
          <van-tag plain v-for="tag in user.tags" type="primary" style="padding: 3px;margin: 1px">{{tag}}</van-tag>
        </template>
        <template #footer>
          <van-button size="mini" @click="talk(user.id,user.avatarUrl)">联系</van-button>
        </template>
      </van-card>
    </van-list>
  </van-pull-refresh>


  <!-- 底部弹出 -->
    <div >
      <van-popup
          v-model:show="showBottom"
          position="bottom"
          :style="{ height: '70%' }"
          @close="close()"
      >
        <template #default>
          <van-list
          >
            <van-cell v-for="msg in historyMessage" :title="item">
                  <van-image
                      round
                      width="2rem"
                      height="2rem"
                      :src="avatar"
                      :style="getFloat(msg)"
                      v-if="isHere(msg)"
                  />
                  <van-tag size="large" type="primary" :style="getFloat(msg)" class="van-tag" v-if="isHere(msg)">{{msg.message}}</van-tag>
            </van-cell>
          </van-list>

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
        </template>
      </van-popup>
    </div>


</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useRouter} from 'vue-router';
import {UserType} from "../models/user";
import {websocketIP} from "../constants/websocketIP";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {match, recommand, tag} from "../api/userPage";
const router=useRouter()
let value = ref('')
const showBottom=ref(false)
let sayValue = ref('')
const userId=ref('')
const avatar=ref('')
const historyMessage=ref([])
const user = ref({});
onMounted(async ()=>{
  user.value =await getCurrentUser();
})
interface UserCardListProps{
  userList:UserType[];
}
const props=defineProps({
  //@ts-ignore
  userList:[],
  pageType:Number,
  tags:[]
});
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const userListSome = ref(props.userList)
const pageNum = ref(1)
const pageSize = ref( 10)
const onLoad = () => {
  setTimeout(async () => {
    // 数组为空加载
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }
    for (let i = 0; i < userListSome.value.length; i++) {
      list.value.push(userListSome.value[i]);
    }
    loading.value = false;
    userListSome.value=[]
    if (props.pageType==1){
      pageNum.value++;
      userListSome.value = await match(pageNum.value,pageSize.value);
    }else if(props.pageType==2){
      pageNum.value++;
      userListSome.value = await recommand(pageSize.value,pageNum.value);
    }else if(props.pageType==3){
      pageNum.value++;
      userListSome.value = await tag(pageNum.value,props.tags,pageSize.value);
    }

    // if (list.value.length >= 40) {
    //   finished.value = true;
    // }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

var ws=ref({})
// 建立websocket连接
ws.value=new WebSocket(websocketIP)
ws.value.onopen=(val)=>{
}
ws.value.onmessage=(msg)=>{
  let currentMsgArr=JSON.parse(msg.data)
  console.log(currentMsgArr)
  console.log(currentMsgArr)
  if (currentMsgArr[0]!=undefined){
    currentMsgArr.forEach(value=>{
      historyMessage.value.push(value)
    })
  }else if (currentMsgArr){
    historyMessage.value.push(currentMsgArr)
  }

}
ws.value.onclose=(e)=>{

}
const talk=(id:string,avatarUrl:string)=>{
  showBottom.value=true
  userId.value=id
  avatar.value=avatarUrl
  let json = ({
    "fromName":user.value.id,
    "toName":userId.value,
    "message":"",
    "messageType":1
  })
  ws.value.send(JSON.stringify(json))
}


const onClickButton=()=>{
  let json={
    "fromName":user.value.id,
    "toName":userId.value,
    "message":sayValue.value,
    "messageType":2
  }
  historyMessage.value.push(json)
  sayValue.value=''
  ws.value.send(JSON.stringify(json))
}

const getFloat=(msg:string)=>{
  if (msg.fromName==user.value.id){
    return " float : right "
  }else{
    return " float : left "
  }
  return "end"
}

const close = ()=>{
  userId.value=null
  historyMessage.value=[]
}

const isHere = (msg)=>{
  return msg.toName == userId.value || msg.toName == user.value || msg.fromName == userId.value || msg.fromName == user.value
}




</script>

<style scoped>
  .van-tag{
    padding:8px;
    margin:0 5px
  }
</style>
