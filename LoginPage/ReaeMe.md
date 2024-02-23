* npm源较慢，切换国内源

~~~
# nrm 是一个 npm 源管理工具，可以方便地切换 npm 源。首先需要全局安装 nrm
npm install -g nrm
# 安装完成后，可以使用以下命令查看可用的源列表
nrm ls
# 然后，使用以下命令切换到国内的源，比如淘宝源
nrm use taobao
~~~

如果安装nrm本身网络就有问题，只能手动切换国内源先

~~~
# 查看当前npm配置文件位置，找到其中.npmrc（在windows里面是隐藏文件）
npm config list
# 在.npmrc文件中新增下面的配置
# registry=https://registry.npm.taobao.org/
# 用下面的命令确认
npm config get registry
# 如果没有生效，在npmrc文件（前面没有点，非隐藏文件）中也加上registry配置
~~~

经过多次实验，腾讯云的源最快

registry=https://mirrors.cloud.tencent.com/npm/


* tsx文件中有中文，导致页面中文乱码

1. 打开浏览器检查tsx对应的js文件（编译后，在浏览器中是js文件）中相应内容是否也是乱码
2. 如果js文件中相应内容也是乱码，说明问题出在tsx文件本身，用文本工具将tsx文件打开，转换成utf-8编码即可




* 为了更好调试代码，需要在Chrome中安装React Developer Tools插件

在VS里面以调试模式启动TS React Web项目后，在Chrome打开网页之后，按下F12

“性能数据分析”（Chrome自带）之后就会出现“Components”和“Profiler”两个选项

点开Components选项就可以看到当前页面正在使用的组件

点击选中相应组件，最右边有一排图标，分别是时钟、眼睛、臭虫、代码

点开代码图标即可看到相应的TS代码，可以直接在里面打断点调试

* 前后端代码分离的项目，前端代码请求后端接口，后端需要做的处理

在POST返回数据里面加上跨域许可：

~~~
resp.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源
~~~

并且需要处理 req.method === "OPTIONS" 预请求

否则请求会报错：

~~~
Access to XMLHttpRequest at 'http://127.0.0.1:3001/api/login' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
~~~


