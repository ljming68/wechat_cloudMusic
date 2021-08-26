// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  // 表单项事件的回调
  handleInput(event){
    // console.log(event)
    //   方法一  适合传唯一标识
    // let type = event.currentTarget.id   
    // 适合 传多个值
    let type = event.currentTarget.dataset.type
    // console.log(type)
    this.setData({
      [type]:event.detail.value
    })
    
    
  },

  // 登录回调
  async login(){
    let {phone,password} = this.data
    //前端验证
    if(!phone){
      wx.showToast({
        title:'手机号不能为空',
        icon:'error'
      })
      return;
    }
    // 正则验证
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title:'手机号格式有误',
        icon:'error'
      })
      return;
    }

    if(!password){
      wx.showToast({
        title:'密码不能为空',
        icon:'error'
      })
      return;

    }

    // 后端验证
    let result = await request('/login/cellphone',{phone,password,isLogin:true});
    console.log(result)
    if(result.code==200){
      wx.showToast({
        title:'登录成功',
        icon:'success'
      })
      wx.setStorageSync('userinfo', result.profile)


      setTimeout(() => {
        wx.reLaunch({ //  跳转到tabbar  页面
          url: '/pages/personal/personal',
        })
      }, 1000);

      

      
    }else if(result.code==502){
      wx.showToast({
        title:'密码有误',
        icon:'error'
      })
      return;
    }else if(result.code==501){
      wx.showToast({
        title:'用户不存在',
        icon:'error'
      })
      return;
    }else{
      wx.showToast({
        title:'登录失败，请重新登录',
        icon:'error'
      })
    }
    
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})