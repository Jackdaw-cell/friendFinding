// @ts-ignore
import myAxios from "../plugins/myAxios";
import {getCurrentUserState, setCurrentUserState} from "../state/user";

// @ts-ignore
export const getCurrentUser= async ()=>{
    // @ts-ignore
    const currentUser = getCurrentUserState();
    // 用缓存优缺点：
    // 1、如果先取缓存（这样会导致即使你改了数据后。看到的信息还是没改）【大系统】，大系统可以写一个路由钩子去实现缓存实时更新，解决拿到的是缓存旧数据的问题
    // 2、如果禁用缓存，则需要每次发送user/current请求获取用户信息（保证同步）【小系统】
    // @ts-ignore
    // if (currentUser){
    //     return currentUser;
    // }
    const res = await myAxios.get('/user/current');
    if (res.code ===0){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}