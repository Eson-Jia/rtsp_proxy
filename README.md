# rtsp_proxy

`FSS`从`RMS/Darwin`取流,然后自己作为`rtsp`服务端,`proxy`放在多个`FSS`的前段负责**服务发现**以及**负载均衡**.

## nginx stream

`configure --with-stream`开启`stream`模块,[配置文件](./nginx.conf),开启命令为`nginx -c nginx.conf`.
