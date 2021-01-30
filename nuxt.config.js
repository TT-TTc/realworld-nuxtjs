module.exports = {
  router: {
    // 自定义路由规则
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由规则
      routes.splice(0)
      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/'),
            children: [
              {
                path: '',
                name: 'home',
                component: resolve(__dirname, 'pages/home/'),
              },
              {
                path: '/login',
                name: 'login',
                component: resolve(__dirname, 'pages/login/'),
              },
              {
                path: '/register',
                name: 'register',
                component: resolve(__dirname, 'pages/login/'),
              },
              {
                path: '/profile/:username',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/'),
              },
              {
                path: '/settings',
                name: 'settings',
                component: resolve(__dirname, 'pages/settings/'),
              },
              {
                path: '/editor',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/'),
              },
              {
                path: '/article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article/'),
              },
            ],
          },
        ]
      )
    },
  },
  server:{
    // 配置成0.0.0.0 可以监听所有的网卡地址
    host:'0.0.0.0',
    port:3000
  },
  plugins: [
    '~/plugins/request',
    '~/plugins/day'
  ],
}
