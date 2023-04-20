# components 组件

公共组件文件夹, components 文件夹下必须存放符合命名规范的`组件文件夹`

## 基础组件

`基础组件` 是全局可复用的组件, 组件内不可包含业务相关代码
> 所有新增的基础组件, 都需要在types/components下声明组件全局类型

基础组件文件以`basic-`开头

- basic-button 基础按钮

## 业务组件

`业务组件` 组件跟业务相关联, 组件代码可一定程度上包含业务逻辑, 但是还是需要考虑组件可拓展性, 组件尽量依赖抽象

业务组件文件以`biz-`开头

- biz-goods 商品项
  - biz-goods-small
  - biz-goods-large

## 第三方组件 (packages)

第三方组件放置于`src/components/packages` 目录下

- z-paging 分页组件
