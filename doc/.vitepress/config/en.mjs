import { defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en-US',
  description: 'A approachable, fast, flexible and lightweight JavaScript library',
  themeConfig: {
    nav: [
      {
        text: 'Change Log',
        link: '/changeLog/',
        activeMatch: '/changeLog/',
      },
    ],
    sidebar: [
      {
        text: 'Guide',
        collapsible: false,
        items: [
          {
            text: 'Started',
            link: '/guide/started/',
          },
          {
            text: 'Install',
            link: '/guide/install/',
          },
        ],
      },
      {
        text: 'Essentials',
        collapsible: false,
        items: [
          {
            text: 'API',
            link: '/essentials/api/',
          },
          {
            text: 'Usage',
            link: '/essentials/usage/',
          },
          {
            text: 'Example',
            link: '/essentials/example/',
          },
        ],
      },
      {
        text: 'Tool',
        collapsible: false,
        items: [
          {
            text: 'MettleRouter',
            link: '/tool/mettleRouter/',
          },
          {
            text: 'CreateMettleApp',
            link: '/tool/createMettleApp/',
          },
          {
            text: 'VitePluginMettle',
            link: '/tool/vitePluginMettle/',
          },
          {
            text: 'BabelPluginMettleHtml',
            link: '/tool/babelPluginMettleHtml/',
          },
          {
            text: 'BabelPresetMettle',
            link: '/tool/babelPresetMettle/',
          },
          {
            text: 'MettleJsxRuntime',
            link: '/tool/mettleJsxRuntime/',
          },
        ],
      },
      {
        text: 'Other',
        collapsible: false,
        items: [
          {
            text: 'JSX Support',
            link: '/other/jsx/',
          },
          {
            text: 'TSX Support',
            link: '/other/tsx/',
          },
          {
            text: 'IDE Support',
            link: '/other/ide/',
          },
          {
            text: 'Browser Compatibility',
            link: '/other/browser/',
          },
          {
            text: 'About',
            link: '/other/about/',
          },
        ],
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present maomincoding',
    },
  },
});
