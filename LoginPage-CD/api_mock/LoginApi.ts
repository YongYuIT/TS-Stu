import * as http from 'http';

const server = http.createServer((req, resp) => {

    //设置响应数据头
    resp.setHeader('Content-Type', 'application/json');
    //返回CORS相关的响应头，允许跨域访问接口
    resp.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源

    console.log('req start with-->' + req.method);

    if (req.method === 'POST') {

        //如果是post请求，解析其中json请求参数
        let req_json_str = '';

        console.log('get POST req');

        req.on('data', chunk => {
            req_json_str += chunk.toString();
        });

        req.on('end', chunk => {

            console.log('req_json-->' + req_json_str);

            let req_json;
            try {
                req_json = JSON.parse(req_json_str);

            } catch (error) {
                const resp_data = {
                    code: 10002,
                    message: 'fuck json pars error',
                    timestamp: new Date().toISOString()
                };
                resp.statusCode = 500;
                return resp.end(JSON.stringify(resp_data));
            }


            console.log('req.url-->' + req.url);

            if (req.url === '/api/login') {
                if (req_json.username === 'admin' && req_json.password === 'admin') {
                    const resp_data = {
                        code: 10000,
                        message: 'success',
                        timestamp: new Date().toISOString()
                    };
                    console.log('return tpye-->' + resp_data.code);
                    resp.statusCode = 200;
                    return resp.end(JSON.stringify(resp_data));
                } else {
                    const resp_data = {
                        code: 10003,
                        message: 'fuck check failed',
                        timestamp: new Date().toISOString()
                    };
                    console.log('return tpye-->' + resp_data.code);
                    resp.statusCode = 200;
                    return resp.end(JSON.stringify(resp_data));
                }
            }
            const resp_data = {
                code: 10004,
                message: 'fuck no api',
                timestamp: new Date().toISOString()
            };
            console.log('return tpye-->' + resp_data.code);
            resp.statusCode = 500;
            return resp.end(JSON.stringify(resp_data));

        });


    } else if (req.method === "OPTIONS") {

        console.log('get OPTIONS');

        //返回CORS相关的响应头，处理预请求，允许跨域
        resp.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // 允许 POST、GET、OPTIONS 方法
        resp.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // 只允许 Content-Type 头部
        resp.setHeader('Access-Control-Max-Age', '86400'); // 预检请求结果的缓存时间（单位：秒），这里设置为 24 小时

        // 结束响应
        resp.end();

    }

    else {

        console.log('not post req !!!-->', req.method);

        const resp_data = {
            code: 10001,
            message: 'fuck not get',
            timestamp: new Date().toISOString()
        };
        resp.statusCode = 500;
        resp.end(JSON.stringify(resp_data));
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log('server for login api on port:' + PORT);
})

// 编译：npx tsc LoginApi.ts
// 运行：node LoginApi.js