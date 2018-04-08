import axios from 'axios'
import { Message ,MessageBox} from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import {showMessage} from '@/utils/index' 
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 6000 // 请求超时时间
})


function getHashParameters(){
    var arr = (location.hash || "").replace(/^\#/,'').replace(/\?/g,'&').split("&");
    
    var params = {};
    for(var i=0; i<arr.length; i++){
        var data = arr[i].split("=");
        if(data.length == 2){
             params[data[0]] = data[1];
        }
    }
    if(arr.length>0){
      return params;
    } else {
      return "";
    }
    
}

// request拦截器
service.interceptors.request.use(config => {
  if(config.url=="/portal/member/oaUserSynchronized"){
    config.timeout=10000
  }
  if (process.env.NODE_ENV != "production") {
    var e=getHashParameters()
    if(e){
      for(let i in e){
        if(config.method=="get"){
          config.params =config.params || {}
          config.params[i]=e[i]
        } else {
         config.data &&( config.data[i]=e[i])
        }
      }
    }
  }
//  if(config.method=="post"){
//    config.headers['Content-Type']="application/json"
//  }
// Do something before request is sent
//  if (store.getters.token) {
//    config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
//  }
  
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response =>{
    let {result,returnCode,errorMessage}=response.data;
    errorMessage && (errorMessage.length>=100 && (errorMessage=errorMessage.substring(0,100)+"..."));
    if(errorMessage && (errorMessage.indexOf('注销')>=0 || errorMessage.indexOf('锁定')>=0)){
      errorMessage=errorMessage.replace('系统错误:',"")
    } else  if(errorMessage && errorMessage.indexOf('For input string')>=0){
      errorMessage="用户不存在"
    }
    if(result && result.redirect){
      if(returnCode=="3"){
        window.location.href=result.redirect
      } else {
        
        MessageBox.alert(errorMessage=="null"?null:errorMessage, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            action=="confirm" && (window.location.href=result.redirect);
          }
        });
      }
      return Promise.reject('error');
    }else if(returnCode!="0"){
      showMessage({msg:errorMessage=="null"?null:errorMessage})
      return Promise.reject('error');
    } else {
      return response.data
    }
   
  },
  
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    showMessage()
    return Promise.reject(error)
  })

export default service
