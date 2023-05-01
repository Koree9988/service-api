const FaultService = require("../services/faultline-data.services")
const moment = require("moment")
const FaultController = {
    getSeparateFaultLineById: async (fId) => {
        try {
            const toDay = new Date(Date.now());
            const year_2007 = new Date("2007-01-01")
            const data = [year_2007]
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
            // let rawData = new Promise(async function (resolve, reject) {
            let all_separate_data = []
            for (let i = 0; i < data.length - 1; i++) {
                const dateStart = data[i]
                const dateEnd = data[i + 1]
                const faultData = await FaultService.getFaultDataByDateRange(fId, dateStart, dateEnd)
                if (dateEnd == undefined) {
                    const dateEndToday = new Date(Date.now())
                    const format_data = {
                        range: {
                            start: ((new Date(dateStart)).toJSON()).slice(0, 10),
                            end: (dateEndToday.toJSON()).slice(0, 10)
                        },
                        data:faultData
                    }
                    all_separate_data.push(format_data)
                }else{
                    const format_data = {
                        range: {
                            start: ((new Date(dateStart)).toJSON()).slice(0, 10),
                            end: ((new Date(dateEnd)).toJSON()).slice(0, 10)
                        },
                        data:faultData
                    }
                    all_separate_data.push(format_data)
                }

            }
            //     resolve(all_separate_data);
            //     reject("error");
            // });

            // rawData.then(
            //     function (value) {
            //         console.log("All separate data value:", value)
            //         return value

            //     },
            //     function (error) { console.log("🚀  rawDataAt15:", error) }
            // );
            return all_separate_data


        } catch (error) {
            console.log("🚀  error:", error)

        }
    }
}

module.exports = FaultController


