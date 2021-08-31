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
        // cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U')!== -1):''
        cookie:wx.getStorageSync('headerCookie')?wx.getStorageSync('headerCookie'):''
        
      },
      // 根据异步任务的结果修改promise的状态
      success:(res)=>{
        if(data.isLogin){
          // console.log(res.cookies)
          wx.setStorageSync('cookies', res.cookies)
          for(let i=0;i<4;i++){
            if (res.cookies[i].search("MUSIC_U")!= -1)
            {
              let headerCookie = res.cookies[i]
              wx.setStorageSync('headerCookie', headerCookie)
            }
          }
          
          
          
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