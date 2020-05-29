var router = require('koa-router')();
const mysql = require('../mysql/index.js')
const server = require('../server/index')

/**
 * 获取微信信息
 */
router.get('/', async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    let data = await mysql.getWeiXinInfo()
    ctx.body = data;
})
/**
 * 添加微信信息
 */
router.get('/setWeiXinInfo', async (ctx) => {
    mysql.setWeiXinInfo(JSON.parse(ctx.query.weiXinUserInfo))
    ctx.body = ctx.query.userInfo
})
/**
 * 获取微信码
 */
router.get('/getWeiXinCode', async (ctx) => {
    const code = await server.getWeiXinCode(JSON.parse(ctx.query.weiXinCode))
    ctx.body = code
})
/**
 * 添加人找车信息
 */
router.get('/itineraryInformationRen', async (ctx) => {
    const data = mysql.addItineraryInformationRen(JSON.parse(ctx.query.userInfo))
    ctx.body = data
})
/**
 * 添加车找人信息
 */
router.get('/itineraryInformationChe', async (ctx) => {
    const data = mysql.addItineraryInformationChe(JSON.parse(ctx.query.userInfo))
    ctx.body = data
})
/**
 * 获取人找车信息列表
 */
router.get('/getRenToCheInfo', async (ctx) => {
    const data = await mysql.getRenToCheInfo(JSON.parse(ctx.query.pageData))
    const totalNumber = await mysql.geRenToCheTotalNumber(JSON.parse(ctx.query.pageData))
    let totalStr = null;
    for (const key in totalNumber) {
        for (const key2 in totalNumber[key]) {
            totalStr = totalNumber[key][key2]
        }
    }
    ctx.body = { data: data, total: totalStr }
})
/**
 * 获取车找人信息列表
 */
router.get('/getCheToRenInfo', async (ctx) => {
    const data = await mysql.getCheToRenInfo(JSON.parse(ctx.query.pageData))
    const totalNumber = await mysql.getCheToRenTotalNumber(JSON.parse(ctx.query.pageData))
    let totalStr = null;
    for (const key in totalNumber) {
        for (const key2 in totalNumber[key]) {
            totalStr = totalNumber[key][key2]
        }
    }
    ctx.body = { data, total: totalStr }
})
/**
 * 添加意见反馈
 */
router.get('/setFeedback', async (ctx) => {
    const data = await mysql.setFeedback(JSON.parse(ctx.query.pageData))
    ctx.body = data
})
/**
 * 查看车辆信息
 */
router.get('/lookDriverInfo', async (ctx) => {
    const data = await mysql.lookDriverInfo(ctx.query.openId)
    ctx.body = data
})
/**
 * 查看乘客信息
 */
router.get('/lookPassengerInfo', async (ctx) => {
    const data = await mysql.lookPassengerInfo(ctx.query.openId)
    ctx.body = data
})
/**
 * 添加订单信息
 */
router.get('/addOrderInfo', async (ctx) => {
    const data = await mysql.addOrderInfo(JSON.parse(ctx.query.pageData))
    ctx.body = data
})
/**
 * 是否发布信息
 */
router.get('/isReleaseInfo', async (ctx) => {
    const passenger = await mysql.lookPassengerInfo(ctx.query.openId)
    const driver = await mysql.lookDriverInfo(ctx.query.openId)
    ctx.body = {
        data: {
            passenger: passenger,
            driver: driver
        }
    }
})
/**
 * 添加邀请上车信息
 */
router.get('/addApplicationListChe', async (ctx) => {
    const data = await mysql.addApplicationListChe(JSON.parse(ctx.query.pageData))
    ctx.body = data
})
/**
 * 添加申请上车信息
 */
router.get('/addApplicationListRen', async (ctx) => {
    const data = await mysql.addApplicationListRen(JSON.parse(ctx.query.pageData))
    ctx.body = data
})
/**
 * 查看用户是否已经邀请上车
 */
router.get('/lookInvitationUpper', async (ctx) => {
    const data = await mysql.lookInvitationUpper(JSON.parse(ctx.query.data))
    ctx.body = data
})
/**
 * 查看预约车辆列表
 */
router.get('/lookApplyUpper', async (ctx) => {
    console.log(ctx.query.openId)
    const data = await mysql.lookApplyUpper(ctx.query.openId)
    ctx.body = data
})
/**
 * 查看我的拼车--司机
 */
router.get('/lookMyCarpoolingByDriver', async (ctx) => {
    const data = await mysql.lookApplyForBoarding(JSON.parse(ctx.query.data))
    const passengerInfo = await mysql.lookPassengerInfo(data.passengerOpenId)
    ctx.body = passengerInfo
})
/**
 * 查看我的拼车--乘客
 */
router.get('/lookMyCarpoolingByPassenger', async (ctx) => {
    const data = await mysql.lookInviteAboard(JSON.parse(ctx.query.data))
    const driverInfo = await mysql.lookDriverInfo(data.driverOpenId)
    console.log(driverInfo)
    ctx.body = driverInfo
})

module.exports = router