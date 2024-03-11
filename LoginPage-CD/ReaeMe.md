# 如果后端不支持跨域，前端在测试环境如何绕过？

1. 在package.json中配置代理

~~~
{
  "name": "loginpage",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://127.0.0.1:3001",
  ... ...
~~~

2. 改绝对路径为相对路径请求

~~~
axios.post<LoginRespData>('http://127.0.0.1:3001/api/login', req_data, {
            headers: {
                'Content-Type': 'application/json' // 设置请求头为 JSON 格式
            }
        })
~~~

改为：

~~~
axios.post<LoginRespData>('/api/login', req_data, {
            headers: {
                'Content-Type': 'application/json' // 设置请求头为 JSON 格式
            }
        })
~~~

大功告成！！！