import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import qs from "qs";

export const match = async(pageNum:number,num:number)=>{
    return await myAxios.get('/user/match', {
        params: {
            pageNum,
            num,
        },
    })
    .then(function (response:object) {
        if (response.data) {
            response.data.forEach((user) => {
                if (user.tags) {
                    user.tags = JSON.parse(user.tags);
                }
            })
        }
       return response?.data;
     })
     .catch(function (error:object) {
       Toast.fail('请求失败');
     })
}

export const recommand = async (pageSize:number,pageNum:number)=>{
    return await myAxios.get('/user/recommand', {
        params: {
            pageSize,
            pageNum,
        },
    })
     .then(function (response) {
         if (response.data.records) {
             response.data.records.forEach((user) => {
                 if (user.tags) {
                     user.tags = JSON.parse(user.tags);
                 }
             })
         }
          return response?.data?.records;
     })
     .catch(function (error) {
         Toast.fail('请求失败');
     })
}

export const tag =async (pageNum:number,tagNameList:object,num:number)=>{
    return await myAxios.get('/user/search/tags',{
        params:{
            tagNameList,
            pageNum,
            num
        },
        paramsSerializer:(params) => {
            return qs.stringify(params,{indices:false})
        }
    })
}
