import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },{
                path: "/createProject",
                name: "creatProject",
                meta: {
                    title: '创建项目'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/CreateProject.vue")
            },
            {
                path: "/projectList",
                name: "projectList",
                meta: {
                    title: '项目列表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/ProjectList.vue")
            },
            {
                path: "/variable2",
                name: "variable2",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/Variable2.vue")
            },
            {
                path: "/variable3",
                name: "variable3",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/Variable3.vue")
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            },{
                path: "/matrix",
                name: "matrix",
                meta: {
                    title: '风险矩阵'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Matrix.vue")
            }, {
                path: "/variable",
                name: "variable",
                meta: {
                    title: '变量'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Variable.vue")
            }, {
                path: "/lopa",
                name: "lopa",
                meta: {
                    title: 'lopa'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Lopa.vue")
            },
            {
                path: "/hazop",
                name: "hazop",
                meta: {
                    title: 'hazop分析'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Hazop.vue")
            },
            {
                path: "/hazop4/:projectId",
                name: "hazop4",
                meta: {
                    title: 'hazop4分析'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Hazop.vue")
            },
            {
                path: "/hazop3",
                name: "hazop3",
                meta: {
                    title: '案例库'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Hazop2.vue")
            },
            {
                path: "/hazop2/:projectId",
                name: "hazop2",
                meta: {
                    title: '案例库'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Hazop2.vue")
            },
            {
                path: "/SIL",
                name: "SIL",
                meta: {
                    title: 'SIL'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/SIL.vue")
            },
            {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }, {
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: 'markdown编辑器'
                },
                component: () => import (/* webpackChunkName: "markdown" */ '../views/Markdown.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;