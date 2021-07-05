tcpsock,err = ngx.req.socket(true)
local line, err, partial = tcpsock:receive('*l')
if not line then
    ngx.say("failed to read a line: ", err)
    return
end
ngx.say("successfully read a line: ", line)