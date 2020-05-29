var mysql = require('mysql');
var config = require('../defete.js')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});


class Mysql {
    constructor() {

    }

    getWeiXinInfo() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from weixin', function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    /**
     * 添加微信信息
     * @param {*} param0 
     */
    setWeiXinInfo({ avatarUrl, city, country, gender, language, nickName, province, openId }) {
        const addSql = `INSERT INTO weixin(avatarUrl, city,country,gender,language,nickName, province,openId) VALUES('${avatarUrl}','${city}','${country}','${gender}','${language}','${nickName}','${province}','${openId}')`;
        pool.query(addSql, (err, results, fields) => {
            if (err) {
                throw err
            }
        })
    }
    /**
     * 添加人找车信息
     * @param {*} param0 
     */
    addItineraryInformationRen({ demand, placeOfDeparture, specificLocation, date, time, numberOfPeople, tel, luggage, remarks, destination, openId, avatarUrl }) {
        const addSql = `INSERT INTO itineraryInformation_ren(demand,placeOfDeparture,specificLocation,date,time,numberOfPeople,tel,luggage,remarks,destination,openId,avatarUrl) VALUES('${demand}','${placeOfDeparture}','${specificLocation}','${date}','${time}','${numberOfPeople}','${tel}','${luggage}','${remarks}','${destination}','${openId}','${avatarUrl}')`;
        pool.query(addSql, (err, results, fields) => {
            if (err) {
                throw err
            }
        })
    }
    /**
     * 添加车找人信息
     * @param {*} param0 
     */
    addItineraryInformationChe({ demand, placeOfDeparture, specificLocation, date, time, numberOfSeats, vehicleType, tel, licensePlateNumber, remarks, cost, destination, openId, avatarUrl }) {
        const addSql = `INSERT INTO itineraryInformation_che(demand,placeOfDeparture,specificLocation,date,time,numberOfSeats,vehicleType,tel,licensePlateNumber,remarks,cost,destination,openId,avatarUrl) VALUES('${demand}','${placeOfDeparture}','${specificLocation}','${date}','${time}','${numberOfSeats}','${vehicleType}','${tel}','${licensePlateNumber}','${remarks}','${cost}','${destination}','${openId}','${avatarUrl}')`;
        pool.query(addSql, (err, results, fields) => {
            if (err) {
                throw err
            }
        })
    }
    /**
     * 获取人找车列表
     */
    getRenToCheInfo({ page, number, placeOfDeparture }) {
        page = (page - 1) * number
        if (page == null) {
            page = 0;
        }
        if (number == null) {
            number = 5;
        }
        return new Promise((resolve, reject) => {
            let str = ""
            if (placeOfDeparture === "") {
                str = `SELECT * from itineraryInformation_ren limit ${page}, ${number}`
            } else {
                str = `SELECT * from itineraryInformation_ren  WHERE placeOfDeparture='${placeOfDeparture}' limit ${page}, ${number}`
            }
            pool.query(str, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 获取车找人列表
     */
    getCheToRenInfo({ page, number, placeOfDeparture }) {
        return new Promise((resolve, reject) => {
            page = (page - 1) * number
            let str = ""
            if (placeOfDeparture === "") {
                str = `SELECT * from itineraryInformation_che limit ${page}, ${number}`
            } else {
                str = `SELECT * from itineraryInformation_che  WHERE placeOfDeparture='${placeOfDeparture}' limit ${page}, ${number}`
            }

            if (page == null) {
                page = 0;
            }
            if (number == null) {
                number = 10;
            }
            pool.query(str, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 获取人找车总条数
     */
    geRenToCheTotalNumber({ placeOfDeparture }) {
        return new Promise((resolve, reject) => {
            let str = ""
            if (placeOfDeparture) {
                str = `SELECT count(*) from itineraryInformation_ren WHERE placeOfDeparture='${placeOfDeparture}'`
            } else {
                str = `SELECT count(*) from itineraryInformation_ren`
            }
            pool.query(str, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 获取车找人总条数
     */
    getCheToRenTotalNumber({ placeOfDeparture }) {
        return new Promise((resolve, reject) => {
            let str = ""
            if (placeOfDeparture) {
                str = `SELECT count(*) from itineraryInformation_che WHERE placeOfDeparture='${placeOfDeparture}'`
            } else {
                str = `SELECT count(*) from itineraryInformation_che`
            }
            pool.query(str, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 添加意见反馈信息
     * @param {*} param0 
     */
    setFeedback({ content }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO feedback(content) VALUES('${content}')`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 查看司机是否发布信息
     * @param {*} openId 
     */
    lookDriverInfo(openId) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from itineraryInformation_che WHERE openId='${openId}'`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 查看乘客是否发布信息
     * @param {*} openId 
     */
    lookPassengerInfo(openId) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from itineraryInformation_ren WHERE openId='${openId}'`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 添加订单信息
     * @param {*} param0 
     */
    addOrderInfo({ passengerOpenId, driverOpenId }) {
        let year = new Date().getFullYear()
        let moon = new Date().getMonth() + 1
        let day = new Date().getDate()
        let h = new Date().getHours()
        let m = new Date().getMinutes()
        let s = new Date().getSeconds()
        const date = `${year}-${moon}-${day}`
        const time = `${h}:${m}:${s}`

        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO order_table(orderNumber,driverOpenId,passengerOpenId,date,time,orderState) VALUES('${new Date().getTime()}','${driverOpenId}','${passengerOpenId}','${date}','${time}','1')`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 查看订单信息
     * @param {*} param0 
     */
    lookOrderInfo({ type, openId }) {
        let str = ""
        if (type === "driver") {
            str = `SELECT * from order_table WHERE driverOpenId='${openId}'`
        } else {
            str = `SELECT * from order_table WHERE passengerOpenId='${openId}'`
        }
        return new Promise((resolve, reject) => {
            pool.query(str, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results[0])
            });
        })
    }
    /**
     * 获取订单车辆信息
     * @param {*} param0 
     */
    getDriverInfo(openId) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from itineraryInformation_che  WHERE openId='${openId}'`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 获取订单车辆信息
     * @param {*} param0 
     */
    getPassengerInfo(openId) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from itineraryInformation_ren  WHERE openId='${openId}'`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 添加车辆申请
     * @param {*} param0 
     */
    addApplicationListChe({ passengerOpenId, driverOpenId }) {
        let year = new Date().getFullYear()
        let moon = new Date().getMonth() + 1
        let day = new Date().getDate()
        let h = new Date().getHours()
        let m = new Date().getMinutes()
        let s = new Date().getSeconds()
        const date = `${year}-${moon}-${day}`
        const time = `${h}:${m}:${s}`

        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO application_list_che(passengerOpenId,driverOpenId,date,time) VALUES('${passengerOpenId}','${driverOpenId}','${date}','${time}')`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 添加乘客申请
     * @param {*} param0 
     */
    addApplicationListRen({ passengerOpenId, driverOpenId }) {
        let year = new Date().getFullYear()
        let moon = new Date().getMonth() + 1
        let day = new Date().getDate()
        let h = new Date().getHours()
        let m = new Date().getMinutes()
        let s = new Date().getSeconds()
        const date = `${year}-${moon}-${day}`
        const time = `${h}:${m}:${s}`

        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO application_list_ren(driverOpenId,passengerOpenId,date,time) VALUES('${driverOpenId}','${passengerOpenId}','${date}','${time}')`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 查看用户是否已经邀请上车
     * @param {*} openId 
     */
    lookInvitationUpper({ passengerOpenId, driverOpenId }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from application_list_che  WHERE driverOpenId='${driverOpenId}' AND passengerOpenId='${passengerOpenId}'`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 查看用户是否已经预约上车
     * @param {*} openId 
     */
    lookApplyUpper(openId) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from application_list_ren  WHERE passengerOpenId='${openId}'`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }
    /**
     * 查看申请上车列表
     * @param {*} openId 
     */
    lookApplyForBoarding({ openId }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from application_list_ren  WHERE driverOpenId='${openId}'`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results[0])
            });
        })
    }
    /**
     * 查看邀请上车列表
     * @param {*} openId 
     */
    lookInviteAboard({ openId }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from application_list_che  WHERE passengerOpenId='${openId}'`, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results[0])
            });
        })
    }
}
module.exports = new Mysql()

