const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())





// 设置MySQL连接  
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shaocan21',
    database: 'students'
})
connection.connect()

// 中间件：解析JSON请求体  
app.use(bodyParser.json())



// 路由：处理POST请求以添加学生  
app.post('/students', (req, res) => {
    const { uname, age, phone } = req.body;
    let stuId = 1; // 简单的示例，实际中需要从数据库中获取最大ID并加1  
    const query = 'SELECT MAX(stuId) AS maxId FROM students';
    connection.query(query, (error, results) => {
        if (error) throw error;
        if (results[0] && results[0].maxId) {
            stuId = results[0].maxId + 1;
        }

        // 插入新学生到数据库  
        const sql = 'INSERT INTO students (uname, age, phone) VALUES ( ?, ?, ?)';
        connection.query(sql, [uname, age, phone,], (error, results) => {
            if (error) throw error;
            res.json({ success: true, stuId: stuId }); // 返回新生成的stuId给前端  
        })
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})