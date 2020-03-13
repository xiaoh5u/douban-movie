//引入路由组件
import Home from '../views/Home'
import Detail from '../views/Detail'
//配置路由的路径、名称
const routes = [
    {
        path: '/home',
        key: 'home',
        component: Home
    },
    {
        path: '/detail/:id',
        key: 'detail',
        component: Detail
    },
]

export default routes