/*
 *核心文件
 */
import axios from "axios"; //引入axios模块
import API from "./config";

//创建axios实例，返回promise对象,完成实例的基本配置
const instance = axios.create({
    //baseURL: "", //设置公用路径
    timeout: 5000, //设置超时时间
})
//instance.interceptors.request.use()


//封装请求方法
function get(url, params) {
    return instance.get(url, params)

}

function post(url, params) {
    return instance.post(url, params)

}

function put(url, params) {
    return instance.put(url, params)

}

function deletes(url, params) {
    return instance.delete(url, params)

}
//封装判断请求方式
export function request(type, url, params) {
    switch (type) {
        case API.METHODS.GET:
            return get(url, params);
        case API.METHODS.POST:
            return post(url, params);
        case API.METHODS.PUT:
            return put(url, params);
        case API.METHODS.DELETE:
            return deletes(url, params);

    }
}