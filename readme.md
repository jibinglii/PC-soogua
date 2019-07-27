# 搜瓜微店PC版

## 安装

克隆后先安装依赖：

```shell
$ npm install
```

或者使用 yarn：

```shell
$ yarn install 
```

跑测试服务：

```shell
$ npm run serve
```

## 配置

Copy the `.env.example` to `.env.[ENV]`:


```shell
# local
cp .env.example .env.local

# production
cp .env.example .env.production
```

其中有两个变量是你在安装后端时 `passport:install` 得到的 **Password Grant Client** 的 `id` 与 `secret`：

```
VUE_APP_AUTH_CLIENT_ID=
VUE_APP_AUTH_CLIENT_SECRET=
```

如果你忘记了，就去找 `oauth_clients` 表中找吧。



配置 [腾讯防水墙](https://007.qq.com/) ID , 需要跟后端一致

```env
# 腾讯防水墙配置
VUE_APP_CAPTCHA_ID_REGISTER=
VUE_APP_CAPTCHA_ID_PUBLISH=
```



## 

目前发现还未完成的功能



- [ ]  1、推广员登录后分销功能的实现
- [ ]  2、未认证的用户发布完商品应该提示去认证
