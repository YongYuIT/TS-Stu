import * as http from 'http';

const server = http.createServer((req, resp) => {

    //������Ӧ����ͷ
    resp.setHeader('Content-Type', 'application/json');
    //����CORS��ص���Ӧͷ�����������ʽӿ�
    resp.setHeader('Access-Control-Allow-Origin', '*'); // ����������Դ

    console.log('req start with-->' + req.method);

    if (req.method === 'POST') {

        //�����post���󣬽�������json�������
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

        //����CORS��ص���Ӧͷ������Ԥ�����������
        resp.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // ���� POST��GET��OPTIONS ����
        resp.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // ֻ���� Content-Type ͷ��
        resp.setHeader('Access-Control-Max-Age', '86400'); // Ԥ���������Ļ���ʱ�䣨��λ���룩����������Ϊ 24 Сʱ

        // ������Ӧ
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

// ���룺npx tsc LoginApi.ts
// ���У�node LoginApi.js