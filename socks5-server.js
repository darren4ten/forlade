const SocksServer = require('socks').SocksServer;

// 创建 SOCKS5 服务器
const server = new SocksServer({
  port: 1080, // 监听的端口号
  host: '0.0.0.0', // 监听所有网络接口
  authenticate: (username, password, callback) => {
    // 身份验证逻辑（可选）
    // 如果不需要验证，可以直接调用 callback(null, true);
    if (username === 'admin' && password === 'password') {
      callback(null, true); // 验证成功
    } else {
      callback(new Error('Invalid username or password'), false); // 验证失败
    }
  },
  filter: (destinationHost, destinationPort, callback) => {
    // 目标地址过滤逻辑（可选）
    // 如果允许连接，调用 callback(null, true);
    console.log(`Request to connect to ${destinationHost}:${destinationPort}`);
    callback(null, true); // 允许所有连接
  }
});

// 启动服务器
server.listen(() => {
  console.log('SOCKS5 proxy server is running on port 1080');
});

// 处理错误
server.on('error', (err) => {
  console.error('SOCKS5 server error:', err);
});

// 处理客户端连接
server.on('connection', (info) => {
  console.log(`New connection from ${info.remoteAddr}:${info.remotePort}`);
});

// 处理客户端断开连接
server.on('close', (info) => {
  console.log(`Connection closed from ${info.remoteAddr}:${info.remotePort}`);
});
