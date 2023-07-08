const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('@koa/cors')
const ratelimit = require("koa-ratelimit")

require('module-alias/register')

const InitManager = require('./core/init.js')

// error handler
onerror(app)
// cors解决跨域
app.use(cors())
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// 静态资源
app.use(require('koa-static')(__dirname + '/public'))
// 视图渲染
// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }))

// apply rate limit
const db = new Map();

app.use(ratelimit({
  driver: 'memory', // memory使用内存驱动，redis使用缓存驱动
  // db: new Redis(),
  db,
  duration: 60000,
  errorMessage: 'Sometimes You Just Have to Slow Down.',
  id: (ctx) => ctx.ip,
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  max: 100,
  disableHeader: false,
  whitelist: (ctx) => {
    // some logic that returns a boolean
  },
  blacklist: (ctx) => {
    // some logic that returns a boolean
  }
}));


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 初始化项目入口
InitManager.initCore(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
