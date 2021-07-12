import { createConnection, createServer } from "net";

const server = createServer((client) => {
    // 'connection' 监听器。
    console.log('client connected');
    client.on('end', () => {
        console.log('client disconnected');
    });
    client.on('error', (err) => {
        console.log('client error', err);
        client.destroy();
    });
    client.once('data', (data) => {
        const firstLine = data.toString();
        const content = firstLine.split(' ');
        if (content.length < 3) {
            client.destroy();
        }
        const originURL = content[1];
        const requestURL = new URL(originURL);
        const peerParam = requestURL.searchParams.get('upstream');
        const [peer, token] = [peerParam ? peerParam : '192.168.1.17:8554', requestURL.searchParams.get('token')];
        const [hostname, port] = peer.split(':');
        const peerSocket = createConnection({ port:8554, host: hostname }, () => {
            peerSocket.write(data);
            peerSocket.pipe(client);
            client.pipe(peerSocket);
        });
        peerSocket.on('end', () => {
            console.log('disconnected from upstream');
        });

    });
});
server.on('error', (err) => {
    throw err;
});
server.listen(8888, () => {
    console.log('server bound');
});