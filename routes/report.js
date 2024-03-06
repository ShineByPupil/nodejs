const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

router.post('/add', (req, res) => {
    setTimeout(() => {
        // res.send('Hello, World!');
        res.json({ message: '(add)Hello, World!' });
    }, 2000);
});

router.post('/edit', (req, res) => {
    // res.send('Hello, World!');
    res.json({ message: '(edit)Hello, World!' });
});

router.post('/query', (req, res) => {
    // 创建数据库连接
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql123',
        database: 'mysql'
    });

    // 连接数据库
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database', err);
            return;
        }
        console.log('Connected to database');

        // 执行查询
        connection.query('SELECT * FROM personal_info', (error, results, fields) => {
            if (error) {
                console.error('Error executing query', error);
                return;
            }

            res.json({ message: results });
            console.log('Query results:', results);
        });

        // 关闭数据库连接
        connection.end((err) => {
            if (err) {
                console.error('Error closing database connection', err);
                return;
            }
            console.log('Closed database connection');
        });
    });
});

module.exports = router;