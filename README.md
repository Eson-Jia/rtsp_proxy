# rtsp_proxy

`FSS`从`RMS/Darwin`取流,然后自己作为`rtsp`服务端,`proxy`放在多个`FSS`的前段负责**服务发现**以及**负载均衡**.

## 方案

1. 使用 tyk tcp 代理
   1. 没有调通
2. openresty
   1. preread_by_lua:使用`sock:receive`读取 OPTIONS 第一行,然后从参数读取 FSS 信息 和 token 信息
   2. balancer_by_lua: 从 `ngx.ctx`中读取比如`peer`值来决定连接哪一个下级服务器
   3. 目前遇到的问题:
      1. preread 阶段`sock:receive`消费了 buffer 中的数据之后,下游服务就无法读取这些数据了
      2. balancer 及以后阶段无法向下游服务器写入这段缺失的数据
      3. 这样就会导致下游服务器收不到`OPTIONS`及以后的数据
3. 自己使用 node.js 实现
   1. 不受制与框架比较灵活
   2. 自由选择依赖库
   3. 但是容易出现 bug
   4. 资源管理不熟练

## nginx stream

`configure --with-stream`开启`stream`模块,[配置文件](./nginx.conf),开启命令为`nginx -c nginx.conf`.

## njs

### API

- [install](https://nginx.org/en/docs/njs/install.html)
- [reference](https://nginx.org/en/docs/njs/reference.html)
- [examples](https://nginx.org/en/docs/njs/examples.html)
- [preread_by_lua_block](https://github.com/openresty/stream-lua-nginx-module#preread_by_lua_block)
