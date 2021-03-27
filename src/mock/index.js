import Mock from 'mockjs'
Mock.mock('login','post', function (inf) {
    
    const {
        body: msg
    } = inf
    const a = JSON.parse(msg)
    if (a.params.username === "admin" && a.params.password === "123456") {
        return Mock.mock({
            data: {
                id: 0,
                username: 'admin',
                email: '2036241878@qq.com',
                password:a.password,
                role:"teacher",
                token:'123456'
            },
            meta: {
                msg: '登录成功',
                status: 200
            }
        })
    } else {
        return Mock.mock({
            data: {
                id: a.password,
                username: 'admin',
                email: '2036241878@qq.com',
               
            },
            meta: {
                msg: '登录失败',
                status: 400
            }
        })
    }
})