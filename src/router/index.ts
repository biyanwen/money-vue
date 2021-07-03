import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Expense from '../views/Expense.vue'
import Incomes from '../views/Incomes.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/record',
        name: 'Record',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Record.vue'),
        //引子路由
        children: [
            {
                path: '/expense',
                name: 'Expense',
                component: Expense,
                props: true
            },
            {
                path: '/incomes',
                name: 'Incomes',
                component: Incomes,
                props: true
            },
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
