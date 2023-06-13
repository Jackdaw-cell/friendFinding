<template>
  <van-form @submit="onSubmit(editUser)">
    <van-tag :show="show" v-for="(tag,index) in editUser.tagArray" style="margin: 1px" closeable size="large" type="primary" @close="close(index)">{{tag}}</van-tag>
    <van-cell-group inset>
        <van-search
            show-action
            v-model="tagText"
            rows="1"
            autosize
            label=""
            type="textarea"
            maxlength="5"
            :placeholder="placeholderText"
            show-word-limit
        >
        <template #action>
          <div @click="addTag(tagText)">添加</div>
        </template>
        </van-search>
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
/*定义route用于路由参数*/
import { useRouter,useRoute } from "vue-router"
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const route = useRoute()
const router = useRouter()
const editUser = ref({
  editKey:route.query.editKey,
  tagArray:route.query.currentValue,
  editName:route.query.editName
})
const tagText=ref('')
if (editUser.value.tagArray==null){
  editUser.value.tagArray=[]
}
let placeholderText=ref("还可以加"+String(5-editUser.value.tagArray.length)+"个标签")
const addTag = (val:string)=>{
  if (editUser.value.tagArray==null){
    Toast("未知异常")
    return;
  }
  if (editUser.value.tagArray.length>4){
    Toast("标签不可以超过5个")
    return;
  }
  if (editUser.value.tagArray){
    editUser.value.tagArray.push(val)
  }else {
    editUser.value.tagArray=[]
    editUser.value.tagArray.push(val)
  }
  placeholderText="还可以加"+String(5-editUser.value?.tagArray?.length)+"个标签"
}
const close= (val:string)=>{
  if (editUser.value.tagArray==null){
    Toast("未知异常")
    return;
  }
  editUser.value.tagArray.pop(val)
  placeholderText.value="还可以加"+String(5-editUser.value.tagArray.length)+"个标签"
}
// JS动态语法：{ [属性字符串]:属性值 } 可以选择性传值，不需要全部传入整个user对象
const onSubmit=async ()=>{
  const currentUser = await getCurrentUser()
  if (!(Object.keys(currentUser).length>0) ){
    Toast.fail('用户未登录')
    return;
  }
  editUser.value.tagArray=JSON.stringify(editUser.value.tagArray)
  const res = await myAxios.post('/user/update',{
    'id': currentUser.id,
    [editUser.value.editKey as string]: editUser.value.tagArray,
  })
  if (res.code==0 && res.data > 0){
    Toast.success('修改成功')
    router.back()
  }else {
    Toast.fail('修改失败')
  }
}

</script>

<style scoped>

</style>
