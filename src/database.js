import { createPool } from 'mysql2';
import { promisify } from 'util';
import { database } from './config.js'; //traigo el database desde el archivo
import { stringify } from 'querystring';
const pool = createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexion con la Database fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La Database tiene demasiadas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('database conexion fue rechazada');
            return 'ECONNREFUSED';
        }
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('ACCESO denegado\n');
        }
    } else if (connection) {
        connection.release(); //con esto empieza la conexion
        console.log('DB is Connected');
    }
    return;
});

//promisify pool queries. Convierte codigo de callbacks a codigo de promesas
pool.query = promisify(pool.query); //cada vez que haga una consulta, se podrán usar promesas.

export default pool;

