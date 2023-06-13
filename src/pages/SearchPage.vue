<template>
  <form action="/">
    <van-search
        v-model="value"
        show-action
        :placeholder="activeIds.length>0?'':'关键词搜索用户'"
        @search="onSearch"
        @cancel="onCancel"
        @update:model-value="onUpdate"
    >
      <template #left-icon>
        <van-row type="flex" gutter="16">
          <van-tag v-for="tag in activeIds" style="margin:10px 1px" :show="true" type="primary" size="small" closeable @close="doClose(tag)">{{tag}}</van-tag>
        </van-row>
      </template>
      <template #action>
        <div @click="doSearchResult">搜索</div>
      </template>
    </van-search>
<!--    <van-button type="primary" @click="doSearchResult">搜索</van-button>-->
<!--    <van-divider content-position="center">已选标签</van-divider>-->
<!--    <div v-if="activeIds.length===0">无</div>-->
<!--    <van-row type="flex" gutter="16">-->
<!--        <van-tag v-for="tag in activeIds" :show="true" type="primary" size="medium" closeable @close="doClose(tag)">{{tag}}</van-tag>-->
<!--    </van-row>-->
    <van-divider content-position="center">选择标签</van-divider>
    <van-tree-select
        height="55vw"
        v-model:active-id="activeIds"
        :items="tagList"
        v-model:main-active-index="activeIndex"
    />
  </form>
</template>

<script setup>
import {ref} from "vue";
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
const router=useRouter()
let value = ref('')
let activeIds = ref([])
const activeIndex = ref(0)
const originTagList = ref([
        { text: '编程语言/技术',
          children: [
            {text:'java',id:'java'},
            {text:'python',id:'python'},
            {text:'goLang',id:'goLang'},
            {text:'javascript',id:'javascript'},
            {text:'springcloud',id:'springcloud'},
            {text:'elastic',id:'elastic'},
            {text:'websocket',id:'websocket'},
          ]
        },
        { text: '游戏',
          children: [
            {text:'怪物猎人',id:'怪物猎人'},
            {text:'蔚蓝',id:'蔚蓝'},
            {text:'空洞骑士',id:'空洞骑士'},
            {text:'塞尔达传说',id:'塞尔达传说'},
            {text:'奥日',id:'奥日'},
            {text:'合金装备',id:'合金装备'},
            {text:'死亡搁浅',id:'死亡搁浅'},
            {text:'CSGO',id:'CSGO'},
            {text:'DOTA2',id:'DOTA2'},
          ]
        },
        { text: '身份',
          children: [
            {text:'学生',id:'学生'},
            {text:'在职',id:'在职'},
          ]
        },
        { text: '目标',
          children: [
            {text:'考研',id:'考研'},
            {text:'求职',id:'求职'},
            {text:'CET4',id:'CET4'},
            {text:'CET6',id:'CET6'},
            {text:'ACM',id:'ACM'},
          ]
        },
      ])
let tagList = ref([
  { text: '编程语言/技术',
    children: [
      {text:'java',id:'java'},
      {text:'python',id:'python'},
      {text:'goLang',id:'goLang'},
      {text:'javascript',id:'javascript'},
      {text:'springcloud',id:'springcloud'},
      {text:'elastic',id:'elastic'},
      {text:'websocket',id:'websocket'},
    ]
  },
  { text: '游戏',
    children: [
      {text:'怪物猎人',id:'怪物猎人'},
      {text:'蔚蓝',id:'蔚蓝'},
      {text:'空洞骑士',id:'空洞骑士'},
      {text:'塞尔达传说',id:'塞尔达传说'},
      {text:'奥日',id:'奥日'},
      {text:'合金装备',id:'合金装备'},
      {text:'死亡搁浅',id:'死亡搁浅'},
      {text:'CSGO',id:'CSGO'},
      {text:'DOTA2',id:'DOTA2'},
    ]
  },
  { text: '身份',
    children: [
      {text:'学生',id:'学生'},
      {text:'在职',id:'在职'},
    ]
  },
  { text: '目标',
    children: [
      {text:'考研',id:'考研'},
      {text:'求职',id:'求职'},
    ]
  },
])
const onSearch = val=>{
      // 判断originTagList数组的children数组是否存在搜索词
      // 扩展：flatMap可以扁平化数组：array.flatMap(parent=>parent.children，父数组array里面有子数组children，返回子数组
      // 注意：关于map方法
      //      当数组元素是基本数据类型时，map()方法不会改变原数组；
      //      当数组元素是引用类型时，map()方法会改变原数组。
      // 下面要提取数组内的数组，防止原数组的子元素被改变
      tagList.value=originTagList.value.map(parentTag=>{
        const tmpChildren=[...parentTag.children]
        const tmp={...parentTag}
        tmp.children=tmpChildren.filter((item=>item.text.includes(value.value)))
        return tmp;
      })
    }
const onCancel=()=>{
      value.value=''
      tagList.value=originTagList.value
    }
const doClose=tag=>{
      activeIds.value=activeIds.value.filter(item=>{
        return item!==tag
      })
    }
const doSearchResult=()=>{
      activeIds.value.push(value.value)
      router.push({
        path:'user/list',
        query:{
          tags: activeIds.value,
        }
      })
}

</script>

<style scoped>

</style>
