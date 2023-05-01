const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const moment = require('moment')

async function getFaultDataByDateRange(id, date_start, date_end) {
    try {
        const faultData = await prisma.fault_data.findMany({
            where: {
                fault_id: Number(id),
                date_utc: {
                    gt: date_start,
                    lte: date_end
                }
            }, orderBy:
            {
                date_utc: 'asc',
            }

        })
        return faultData
    } catch (error) {
        console.log("🚀  error:", error)

    }
}

const fId = 2
const toDay = new Date(Date.now());
console.log("Date today:", toDay)

const year_2007 = new Date("2007-01-01")
const data = [year_2007]
console.log("🚀  year_2007:", year_2007)
let date_temp = moment(year_2007)

while (1) {
    const temp_date_add = moment(date_temp).add(5, 'years')
    if (temp_date_add.isAfter(moment(toDay))) {
        data.push(undefined)
        break
    } else {
        data.push(new Date(temp_date_add))
        date_temp = temp_date_add
    }
}

// const toDayAt5 = new Date(moment(year_2007).add(5, 'years'))
// const toDayAt10 = new Date(moment(toDayAt5).subtract(5, 'years'))
// const toDayAt15 = new Date(moment(toDayAt10).subtract(5, 'years'))



// console.log(`2007 - 5 years ago:`, toDayAt5)
// console.log("🚀  5 years ago - 10 years ago:", toDayAt10)
// console.log("🚀  10 years ago - 15 years ago:", toDayAt15)
// const startDate = new Date(toDayAt5)
// const endDate = new Date(toDay)
// const rawDataAt5 = getData(fId, startDate, endDate)
// console.log("🚀  rawDataAt5:", rawDataAt5)

let rawData = new Promise(async function (resolve, reject) {
    let all_separate_data = []
    for (let i = 0; i < data.length - 1; i++) {
        const dateStart = data[i]
        const dateEnd = data[i + 1]
        const faultData = await getFaultDataByDateRange(fId, dateStart, dateEnd)
        all_separate_data.push(faultData)
    }
    resolve(all_separate_data);
    reject("error");
});

rawData.then(
    function (value) {
        console.log("All separate data value:", value)
    },
    function (error) { console.log("🚀  rawDataAt15:", error) }
);









