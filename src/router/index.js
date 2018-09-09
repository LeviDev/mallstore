import Vue from 'vue'
import Router from 'vue-router'

import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import Category from '@/components/pages/Category'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'
import Address from '@/components/pages/Address'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/main',
            name: 'Main',
            component: Main,
            children: [{
                    path: '/',
                    name: 'ShoppingMall',
                    component: ShoppingMall
                },
                {
                    path: '/category',
                    name: 'Category',
                    component: Category
                },
                {
                    path: '/cart',
                    name: 'Cart',
                    component: Cart
                },
                {
                    path: '/member',
                    name: 'Member',
                    component: Member
                },
            ]
        },

        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/goods',
            name: 'Goods',
            component: Goods
        },
        {
            path: '/address',
            name: 'Address',
            component: Address
        },
    ]
})
