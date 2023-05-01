const jsonData = require('./fault-line-data.json')
const moment = require('moment')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const FaultService = {
    getFaultData: async (id) => {
        try {
            const faultData = await prisma.fault_data.findMany({
                where: {
                    fault_id: Number(id)
                }, orderBy:
                {
                    date_utc: 'asc',
                }
            })
            if (!!faultData) {
                console.log("🚀  faultData:", faultData.length)
            }
            return faultData
        } catch (error) {
            console.log("🚀  error:", error)

        }
    },
    getFaultName: async (id) => {
        try {
            const faultName = await prisma.faults.findFirst({
                where: {
                    fault_id: Number(id)
                }

            })
            if (!!faultName) {
                console.log("🚀  faultData:", faultName.fault_name)

            }
            return faultName
        } catch (error) {
            console.log("🚀  error:", error)

        }
    },
    storeFaulLine: async () => {
        try {
            const returnData = {}
            for (let index = 0; index < jsonData.length; index++) {
                const element = jsonData[index];
                const date = new Date()
                const data = await prisma.faults.create({
                    data: {
                        fault_id: element.FAULT_ID,
                        fault_name: element.FAULT_NAME,
                        created_at: date,
                        updated_at: date
                    }
                })
                returnData.index = data
            }
            return returnData
        }
        catch (err) {
            console.log("🚀 ~ err", err)
        }
    },
    storeFaultData: async (rawData) => {
        try {
            const data = await prisma.fault_data.create({
                data: rawData
            })
            return data

        }
        catch (err) {
            console.log("🚀 ~ err storeFaultData", err)
        }
    },
    storeRawFaultData: async (rawData) => {
        try {
            const data = await prisma.raw_data.create({
                data: rawData
            })
            return data

        }
        catch (err) {
            console.log("🚀 ~ err storeRawFaultData", err)
        }
    },
    getFaultDataByDateRange: async (id, date_start, date_end) => {
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
    },
    getFaultDataSeparateEach5Year: async (id) => {
        try {
            const dateEnd = new Date(Date.now());
            const dateStart1 = new Date(moment(dateEnd).subtract(5, 'years'))
            const dateStart2 = new Date(moment(dateStart1).subtract(5, 'years'))
            const dateStart3 = new Date(moment(dateStart2).subtract(5, 'years'))
            const to5YearsAgo = await prisma.fault_data.findMany({
                where: {
                    fault_id: Number(id),
                    date_utc: {
                        gt: dateStart1,
                        lte: dateEnd
                    }
                }, orderBy:
                {
                    date_utc: 'asc',
                }

            })
            const to10YearsAgo = await prisma.fault_data.findMany({
                where: {
                    fault_id: Number(id),
                    date_utc: {
                        gt: dateStart2,
                        lte: dateStart1
                    }
                }, orderBy:
                {
                    date_utc: 'asc',
                }

            })
            const to15YearsAgo = await prisma.fault_data.findMany({
                where: {
                    fault_id: Number(id),
                    date_utc: {
                        gt: dateStart3,
                        lte: dateStart2
                    }
                }, orderBy:
                {
                    date_utc: 'asc',
                }

            })
            const separateEach5Years = await {
                range1: {
                    start: (dateStart1.toJSON()).slice(0, 10),
                    end: (dateEnd.toJSON()).slice(0, 10)
                },
                range2: {
                    start: (dateStart2.toJSON()).slice(0, 10),
                    end: (dateStart1.toJSON()).slice(0, 10)
                },
                range3: {
                    start: (dateStart3.toJSON()).slice(0, 10),
                    end: (dateStart2.toJSON()).slice(0, 10)
                },
                to5Years: to5YearsAgo,
                to10Years: to10YearsAgo,
                to15Years: to15YearsAgo,

            }
            // console.log("🚀  separateEach5Years:", separateEach5Years)
            return separateEach5Years
        } catch (error) {
            console.log("🚀  error:", error)

        }
    }
}

module.exports = FaultService

