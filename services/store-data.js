const fs = require("fs");
const { parse } = require("csv-parse");
const FaultService = require("./faultline-data.services.js")
const faultSelectionService = require("./classify-fault-data.js")

fs.createReadStream("./services/earth-quake-dataset.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", async function (row) {
        const date = new Date()
        const dateString = String(row[0]);
        const formattedDateString = dateString.slice(0, 4) + '-' + dateString.slice(4, 6) + '-' + dateString.slice(6, 8) + 'T' + dateString.slice(9) + 'Z';
        const timestamp = new Date(Date.parse(formattedDateString));
        const rawData = await {
            date_utc: timestamp,
            magnitute: parseFloat(row[1]),
            lat: parseFloat(row[2]),
            long: parseFloat(row[3]),
            utm_x: parseInt(row[4]),
            utm_y: parseInt(row[5]),
            depth: parseInt(row[6]),
            phase: parseInt(row[7]),
            center_th: row[8],
            center_en: row[9],
            severity_level: parseInt(row[10]),
            created_at: date,
            updated_at: date
        }
        const faultId = await faultSelectionService.classifyFault(parseInt(row[4]), parseInt(row[5]))
        console.log("🚀  faultId:", faultId)
        const fault_data = await {
            date_utc: timestamp,
            magnitute: parseFloat(row[1]),
            fault_id: parseInt(faultId),
            created_at: date,
            updated_at: date
        }
        const storeClass = await FaultService.storeFaultData(fault_data)
        const storeRaw = await FaultService.storeRawFaultData(rawData)
    })
    .on("error", function (error) {
        console.log(error.message);
    })
    .on("end", function () {
        console.log("finished");
    });
