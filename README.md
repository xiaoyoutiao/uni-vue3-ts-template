# uniapp + vue3 + ts 项目开发模版
>  uniapp开发模版 by  ryu.huang

## 集成 uni-ui 框架

[Github 链接](https://github.com/dcloudio/uni-ui)

```ts
<template>
  <view class="content">
    <UniBadge :text="9" />
  </view>
</template>

<script setup lang="ts">
// 组件引用
import UniBadge from "@ui/uni-badge/uni-badge.vue";
</script>

```

## 路由 & 页面管理



## http 请求封装

## 状态管理

## 工具方法

## 类型定义

## 代码校验

### Eslint 相关插件

1. [eslint-plugin-vue](https://eslint.vuejs.org/) : Vue.js 的官方 ESLint 插件。
2. [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin): 为 TypeScript 代码库提供 eslint 规则。
3. [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier): 将 Prettier 作为 ESLint 规则运行，并将差异作为 ESLint 问题。
4. [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md) : 此插件支持 ES2015+ (ES6+) 导入/导出语法的检查(仅引用 `eslint-plugin-import/order` 模块)
5. [eslint-plugin-you-dont-need-lodash-underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/blob/master/configuring.md) :
   识别代码库中不需要 Lodash/Underscore 的地方。(由于小程序轻量级特性, 禁止使用 Lodash/Underscore 等类库)

## miniprogram-ci

## 原子化 css

### unocss

1. [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp) : 为 UniApp 和 Taro 的微信小程序提供的预设
2. [@unocss/transformer-directives](https://github.com/unocss/unocss/tree/main/packages/transformer-directives): @apply、@screen 和 theme()指令的 UnoCSS 转换器, 使用对应的指令, 将支持的样式或主题应用到 css 中
   > 项目中的`tailwind.config.cjs`只是为了利用 tailwind 的 vscode 拓展进行主题提示, 后续 unocss 支持相关 vscode 提示的话再移除此配置

## 第三方库

- type-fest ts 类型工具集

