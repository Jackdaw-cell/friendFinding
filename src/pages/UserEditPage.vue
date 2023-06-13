<template>
  <van-form @submit="onSubmit(editUser)">
    <van-field
        v-model="editUser.value"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入内容${editUser.editName}`"
        :rules="[{ required: true, message: '请填写用户名' }]"
    />
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
import {UserType} from "../models/user";
const route = useRoute()
const router = useRouter()
const editUser = ref({
  editKey:route.query.editKey,
  value:route.query.currentValue,
  editName:route.query.editName
})

// JS动态语法：{ [属性字符串]:属性值 } 可以选择性传值，不需要全部传入整个user对象
const onSubmit=async ()=>{
  const currentUser = await getCurrentUser()
  if (!(Object.keys(currentUser).length>0) ){
    Toast.fail('用户未登录')
    return;
  }
  const res = await myAxios.post('/user/update',{
    'id': currentUser.id,
    [editUser.value.editKey as string]: editUser.value.value,
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
