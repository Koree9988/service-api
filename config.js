const dotenv =require('dotenv')
dotenv.config()
const config = {
    port : process.env.PORT || 3030,
    host : '0.0.0.0',
    database : {
        URL: process.env.DATABASE_URL
    }
}

module.exports = config