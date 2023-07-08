### 项目结构
```iterm2
├── _tests (未完成)
├── app *重点, 项目工程入口
    ├── api 接口
    ├── dao 数据存取对象（Data Access Objects）
    ├── lib 工具库
    ├── models 建模，把业务逻辑映射成数据模型
    └── validators 数据验证
├── app.js 入口文件
├── bin 项目启动入口
├── config 配置文件
├── core 核心公共工具库
├── doc 接口文档（未完成）
├── jest.config.js  测试配置文件（未完成）
├── middlewares 中间件
├── package-lock.json
├── package.json
└── yarn.lock
```