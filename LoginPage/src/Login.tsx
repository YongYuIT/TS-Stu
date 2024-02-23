import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface LoginRespData {
    code: number,
    message: string,
    timestamp: string
}

const Login: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        //此处是登录逻辑，需要请求后台
        const req_data = {
            "username": username,
            "password": password
        }

        axios.post<LoginRespData>('http://127.0.0.1:3001/api/login', req_data, {
            headers: {
                'Content-Type': 'application/json' // 设置请求头为 JSON 格式
            }
        }).then((response: AxiosResponse<LoginRespData>) => {
            // 请求成功
            console.log('resp success!');
            console.log(response.data); // 打印返回的数据

            if (response.data.code === 10000) {
                alert("login success!");
            } else {
                alert("login failed-->" + response.data.message);
            }

        }).catch((error) => {
            // 请求失败
            console.error('Error fetching data:', error);
            alert("login failed-->" + error.message);
        });
    };

    return (
        <div>
            <h2>登录页</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>用户名：</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div>
                    <label>密码：</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                </div>
                <button type="submit">登录</button>
            </form>
        </div>
    );

};

export default Login;