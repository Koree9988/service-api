const jsonData = require('./fault-line-data.json')
const faultSelectionService = {
    classifyFault: async (utm_x, utm_y) => {
        try {
            const x = parseInt(utm_x)
            const y = parseInt(utm_y)
            for (let i = 0; i < jsonData.length; i++) {
                const faultArea = jsonData[i].FAULT_AREA;
                const polygonPoints = faultArea.map(point => [point.X, point.Y]);
                let inside = false;
                for (let i = 0, j = polygonPoints.length - 1; i < polygonPoints.length; j = i++) {
                    const xi = polygonPoints[i][0];
                    const yi = polygonPoints[i][1];
                    const xj = polygonPoints[j][0];
                    const yj = polygonPoints[j][1];
                    const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                    if (intersect) inside = !inside;
                }
                if (inside) {
                    return parseInt(jsonData[i].FAULT_ID);
                }
            }
            return null;
        } catch (error) {
            console.log("🚀  error:class", error)
        }
    }
}

module.exports = faultSelectionService


// const jsonData = require('./fault-line-data.json')

// const faultSelectionService = {
//     classifyFault: async (x, y) => {
//         try {
//             for (let i = 0; i < jsonData.length; i++) {
//                 const faultArea = jsonData[i].FAULT_AREA;
//                 const polygonPoints = faultArea.map(point => [point.X, point.Y]);

//                 if (isPointInPolygon(x, y, polygonPoints)) {
//                     return jsonData[i].FAULT_ID;
//                 }
//             }

//             return null;
//         } catch (error) {
//             console.log("🚀  error:", error)

//         }

//     },

//     isPointInPolygon: async (x, y, polygon) => {
//         try {
//             let inside = false;
//             for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//                 const xi = polygon[i][0];
//                 const yi = polygon[i][1];
//                 const xj = polygon[j][0];
//                 const yj = polygon[j][1];

//                 const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//                 if (intersect) inside = !inside;
//             }

//             return inside;
//         } catch (error) {
//             console.log("🚀  error:", error)

//         }

//     }
// }

// module.exports = faultSelectionService




