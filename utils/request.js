// 封装发送ajax请求的功能函数
import config from './config';
export default(url,data={},method='GET')=>{
  return new Promise((resolve,reject)=>{
    //初始化promise 状态为pending
    //执行异步任务
    wx.request({
      url:config.host + url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookies').toString()?wx.getStorageSync('cookies').toString():''
      },
      // 根据异步任务的结果修改promise的状态
      success:(res)=>{
        if(data.isLogin){
          // console.log(res.cookies)
          wx.setStorageSync('cookies', res.cookies)
        }
        
        resolve(res.data)

      },
      fail:(err)=>{
        console.log(err);
        reject(err)
      }
    })
  })
}