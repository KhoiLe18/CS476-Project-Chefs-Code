const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'fd7a:115c:a1e0::3401:9a65',
    user: 'remote',  
    password: 'ChefsCode_476',
    database: 'chefscode',
    connectionLimit: 5,
    ssl: false
});

module.exports = pool;