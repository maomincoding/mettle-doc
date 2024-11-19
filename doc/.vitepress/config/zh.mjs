import { defineConfig } from 'vitepress';

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '一个易用、快速、灵活且轻量级的JavaScript库',
  themeConfig: {
    nav: [
      {
        text: '更新日志',
        link: '/zh/changeLog/',
        activeMatch: '/zh/changeLog/',
      },
    ],
    sidebar: [
      {
        text: '指导',
        collapsible: false,
        items: [
          { text: '开始', link: '/zh/guide/started/' },
          { text: '安装', link: '/zh/guide/install/' },
        ],
      },
      {
        text: '要点',
        collapsible: false,
        items: [
          {
            text: 'API',
            link: '/zh/essentials/api',
          },
          {
            text: '用法',
            link: '/zh/essentials/usage',
          },
          {
            text: '案例',
            link: '/zh/essentials/example',
          },
        ],
      },
      {
        text: '工具',
        collapsible: false,
        items: [
          {
            text: 'CreateStrveApp',
            link: '/zh/tool/createStrveApp/',
          },
          {
            text: 'StrveRouter',
            link: '/zh/tool/strveRouter/',
          },
          {
            text: 'BabelPluginStrve',
            link: '/zh/tool/babelPluginStrve/',
          },
          {
            text: 'BabelPluginJsxToStrve',
            link: '/zh/tool/babelPluginJsxToStrve/',
          },
          {
            text: 'StrveReactivity',
            link: '/zh/tool/strveReactivity/',
          },
          {
            text: 'StrveRv',
            link: '/zh/tool/strveRv/',
          },
        ],
      },
      {
        text: '其他',
        collapsible: false,
        items: [
          {
            text: 'JSX 支持',
            link: '/zh/other/jsx/',
          },
          {
            text: 'IDE 支持',
            link: '/zh/other/ide/',
          },
          {
            text: '浏览器兼容性',
            link: '/zh/other/browser/',
          },
          {
            text: '关于',
            link: '/zh/other/about/',
          },
        ],
      },
    ],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2021-${new Date().getFullYear()} maomincoding`,
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: {
      label: '页面导航',
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
});
