//入口文件
import {
    request
} from './core'; //引入请求
import API from './config'; //引入API模块
//封装请求方法
const http = {
    login(username, password) {
        return request(API.METHODS.POST, API.PATH.LOGIN, {
            params: {
                  username:username,
                  password:password
            }
        })
    }
}
export default http