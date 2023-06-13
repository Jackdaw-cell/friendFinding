// 路由
// @ts-ignore
import Index from "../pages/Index.vue";
// @ts-ignore
import Team from "../pages/TeamPage.vue";
// @ts-ignore
import UserPage from "../pages/UserPage.vue";
// @ts-ignore
import SearchPage from "../pages/SearchPage.vue";
// @ts-ignore
import UserEditPage from '../pages/UserEditPage.vue'
// @ts-ignore
import SearchResultPage from "../pages/SearchResultPage.vue";
// @ts-ignore
import UserLoginPage from "../pages/UserLoginPage.vue"
// @ts-ignore
import TeamAddPage from "../pages/TeamAddPage.vue";
// @ts-ignore
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
// @ts-ignore
import UserUpdatePage from "../pages/UserUpdatePage.vue";
// @ts-ignore
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
// @ts-ignore
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
// @ts-ignore
import UserEditTagPage from "../pages/UserEditTagPage.vue";


const routes=[
    { path: '/', title: '首页', component: Index },
    { path: '/team', title: '找队伍', component: Team },
    { path: '/team/add', title: '创建队伍', component: TeamAddPage },
    { path: '/team/update', title: '更新队伍', component: TeamUpdatePage },
    { path: '/user', title: '个人信息', component: UserPage },
    { path: '/search', title: '找伙伴', component: SearchPage },
    { path: '/user/list', title: '用户列表', component: SearchResultPage },
    { path: '/user/edit', title: '编辑信息', component: UserEditPage },
    { path: '/user/editTag', title: '编辑标签信息', component: UserEditTagPage },
    { path: '/user/login', title: '登录', component: UserLoginPage },
    { path: '/user/update', title: '更新信息', component: UserUpdatePage },
    { path: '/user/team/join', title: '加入队伍', component: UserTeamJoinPage },
    { path: '/user/team/create', title: '创建队伍', component: UserTeamCreatePage },
]

export default routes;
