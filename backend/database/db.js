import { createPool, Pool, PoolConnection } from 'mariadb';
import logger from './logger';
export const AdminLoginRouter=Router()

let rec = 0;

export const getConnection = async () => {
    if (conn !== undefined) {
        return conn;
    }
    try {
        rec++;
        if (rec > 5) {
            return conn;
        }
        console.log('port' , process.env.DB_PORT);
        
        const password = process.env.DB_PASSWORD;
        const host = process.env.DB_HOST;
        const port = Number(process.env.DB_PORT);
        const database = process.env.DB_NAME_WMS;
        const user = process.env.DB_USER;
      
        const _conn = createPool({
            user,
            // host: '139.59.61.44',
            host,
            database,
            password,
            port,
            connectionLimit: 10, 
            connectTimeout: 10000, 
            acquireTimeout: 10000, 
            dateStrings:true
        });
        logger.info('Connected to database');
        conn = _conn;
        rec = 0;
        return conn;
    } catch (err) {
        logger.error(`Error connecting to database ${err}`);
        return getConnection();
    }
};
// aaaaaaa
// const { Sequelize } = require('sequelize');

// const db = new Sequelize('your_database_name', 'your_username', 'admin@123', {
//   host: 'localhost',
//   dialect: 'mariadb',
//   port: 3008,
// });

// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch((err) => console.error('Database connection error:', err));

// module.exports = db;


