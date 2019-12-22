var sql = require('mysql');
var config = require('../config');

class DbService {
    async connect() {
        // Create connection to database
        const cfg = 
        {
            host: config.database.hostname,
            database: config.database.name,
            user: config.database.username,
            password: config.database.password
        }

        return await sql.connect(cfg);
    }

    async query(queryStr) {
        try {
            await sql.close();
            const connection = await this.connect();
            const result = await connection.query(queryStr);

            return result;
        } catch(err) {
            console.error(`query '${queryStr}' failed for error: '${err}'`);
        }
    }

    async close() {
        await sql.close();
    }
}

module.exports = new DbService();
