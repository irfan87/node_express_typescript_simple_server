import mysql from 'mysql';
import config from './config';

const params = {
    user: config.mysql.user,
    password: config.mysql.password,
    host: config.mysql.host,
    database: config.mysql.database
};

// create mysql connections
const Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        const mysql_connection = mysql.createConnection(params);

        mysql_connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(mysql_connection);
        });
    });

const Query = async (connection: mysql.Connection, query: string) =>
    new Promise((resolve, reject) => {
        connection.query(query, connection, (result, error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });

export { Connect, Query };
