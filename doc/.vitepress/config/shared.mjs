import { defineConfig } from 'vitepress';

export const shared = defineConfig({
  base: '/mettle-doc/',
  title: 'Mettle',
  rewrites: {
    'en/:rest*': ':rest*',
  },
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code');
        },
      },
    ],
  },
  sitemap: {
    hostname: 'https://vitepress.dev',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'));
    },
  },
  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/mettle-doc/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/mettle-doc/logo.png' }],
    ['meta', { name: 'theme-color', content: '#6c2de4' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Mettle | A approachable, fast, flexible and lightweight JavaScript library' }],
    ['meta', { property: 'og:site_name', content: 'Mettle' }],
    ['meta', { property: 'og:image', content: '/mettle-doc/logo.png' }],
    ['meta', { property: 'og:url', content: 'https://vitepress.dev/' }],
  ],
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    socialLinks: [{ icon: 'github', link: 'https://github.com/maomincoding/mettle' }],
  },
});
