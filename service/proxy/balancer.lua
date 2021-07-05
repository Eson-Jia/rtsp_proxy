local balancer = require "ngx.balancer"
local host = "192.168.1.72"
local port = 9191

local ok, err = balancer.set_current_peer(host, port)
if not ok then
    ngx.log(ngx.ERR, "failed to set the current peer: ", err)
    return ngx.exit(500)
end
ok, err = balancer.recreate_request()
if not ok then
    ngx.log(ngx.ERR, "failed to set the current peer: ", err)
    return ngx.exit(500)
end