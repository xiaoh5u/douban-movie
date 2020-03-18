//引入路由组件
import Home from '../views/Home'
import Detail from '../views/Detail'
import Error from '../views/NotFound'
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
    {
        path: '/error',
        key: 'Error',
        component: Error
    },
]

export default routes