const sql = require('mssql');
const config = {
    user: '**',
    password: '****',
    server: '*****',
    database: '*****',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

let poolPromise;

async function db() {
    if (!poolPromise) {
        poolPromise = sql.connect(config)
            .then(pool => {
                console.log('Veritabanı bağlantısı başarılı');
                return pool;
            })
            .catch(err => {
                console.error('Veritabanı bağlantı hatası:', err);
                throw err;
            });
    }
    return poolPromise;
}

async function query(sqlQuery) {
    try {
        const pool = await db();
        const result = await pool.request().query(sqlQuery);
        return result;
    } catch (err) {
        console.error('Sorgu hatası:', err);
        throw err;
    }
}

module.exports = { db, query };
