# uniapp + vue3 + ts 项目开发模版

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
4. [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md) : 此插件支持 ES2015+ (ES6+) 导入/导出语法的检查
   > 此处仅引用 `eslint-plugin-import/order` 模块

## miniprogram-ci

## 原子化 css

## 第三方库

- type-fest ts 类型工具集
