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
            link: '/zh/essentials/api/',
          },
          {
            text: '用法',
            link: '/zh/essentials/usage/',
          },
          {
            text: '案例',
            link: '/zh/essentials/example/',
          },
        ],
      },
      {
        text: '工具',
        collapsible: false,
        items: [
          {
            text: 'MettleRouter',
            link: '/zh/tool/mettleRouter/',
          },
          {
            text: 'CreateMettleApp',
            link: '/zh/tool/createMettleApp/',
          },
          {
            text: 'VitePluginMettle',
            link: '/zh/tool/vitePluginMettle/',
          },
          {
            text: 'MettleJsxRuntime',
            link: '/zh/tool/mettleJsxRuntime/',
          },
          {
            text: 'BabelPluginMettleHtml',
            link: '/zh/tool/babelPluginMettleHtml/',
          },
          {
            text: 'BabelPresetMettle',
            link: '/zh/tool/babelPresetMettle/',
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
            text: 'TSX 支持',
            link: '/zh/other/tsx/',
          },
          {
            text: 'IDE 支持',
            link: '/zh/other/ide/',
          },
          {
            text: '适配',
            link: '/zh/other/adapt/',
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
